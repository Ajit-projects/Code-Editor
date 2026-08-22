# Code Execution Architecture

## Overview

The code editor uses a separate execution service to run user-submitted source code.

The application is divided into three primary responsibilities:

1. **Next.js application** — handles the editor UI and application-level API requests.
2. **Convex backend** — stores execution history and user-related execution data.
3. **Dedicated execution service** — compiles and executes source code inside an isolated temporary workspace.

This separation prevents the main application server from directly executing arbitrary user code.

---

## Execution Flow

```text
┌──────────────────────┐
│      Code Editor     │
│   Next.js Frontend   │
└──────────┬───────────┘
           │
           │ POST /api/execute
           │ language + source code
           ▼
┌──────────────────────┐
│   Next.js API Route  │
│   /api/execute       │
└──────────┬───────────┘
           │
           │ Internal API request
           │ x-api-key
           ▼
┌──────────────────────┐
│   Execution Service  │
│   Docker / Render    │
└──────────┬───────────┘
           │
           │ Create temporary workspace
           ▼
┌──────────────────────┐
│ /tmp/<execution-id>  │
│                      │
│ source file          │
│ compiler output      │
│ executable           │
└──────────┬───────────┘
           │
           │ Compile + execute
           ▼
┌──────────────────────┐
│ Runtime Environment  │
│                      │
│ Node.js              │
│ Python 3             │
│ GCC / C++            │
│ Java JDK             │
└──────────┬───────────┘
           │
           │ stdout / stderr
           ▼
┌──────────────────────┐
│   Next.js API Route  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      Code Editor     │
│  Output / Error UI   │
└──────────────────────┘

                    ┌──────────────────────┐
                    │       Convex         │
                    │  Execution History   │
                    └──────────▲───────────┘
                               │
                               │ Save execution
                               │
                    ┌──────────┴───────────┐
                    │ Application Backend  │
                    └──────────────────────┘
```

---

## 1. Frontend

The editor maintains the current:

* programming language
* source code
* editor configuration
* execution state
* output
* execution errors

When the user selects **Run**, the frontend sends:

```json
{
  "language": "javascript",
  "code": "console.log('Hello World')"
}
```

to:

```text
POST /api/execute
```

The frontend does not communicate directly with the execution service.

This keeps the execution-service URL and authentication credentials out of browser-side code.

---

## 2. Next.js Execution API

The Next.js API route acts as the application-facing execution gateway.

Responsibilities:

* accept execution requests from the editor
* validate the request
* forward source code to the execution service
* authenticate the internal service request
* return execution results to the frontend
* normalize execution-service failures

Conceptually:

```text
Browser
   │
   ▼
/api/execute
   │
   ├── validate request
   ├── authenticate downstream request
   └── forward execution request
           │
           ▼
      Execution Service
```

The execution-service URL is configured through an environment variable rather than hardcoded into the application.

---

## 3. Execution Service

The execution service is a separate Docker-based service.

Current runtime support:

| Language   | Runtime  |
| ---------- | -------- |
| JavaScript | Node.js  |
| Python     | Python 3 |
| C++        | GCC      |
| Java       | OpenJDK  |

The service exposes:

```text
POST /execute
```

and accepts:

```json
{
  "language": "cpp",
  "code": "#include <iostream>..."
}
```

---

## 4. Temporary Execution Workspace

Each execution receives a unique temporary directory:

```text
/tmp/<uuid>/
```

For example:

```text
/tmp/84d21ae4-1284-48b1-80c5-f9aff5c7ef81/
```

The source file is written into this directory.

Examples:

```text
JavaScript → index.js
Python      → main.py
C++         → main.cpp
Java        → Main.java
```

This prevents different executions from sharing the same working directory.

---

## 5. Compilation and Execution

Interpreted languages are executed directly.

### JavaScript

```text
source → index.js → Node.js → stdout/stderr
```

### Python

```text
source → main.py → Python 3 → stdout/stderr
```

Compiled languages use a two-stage process.

### C++

```text
main.cpp
   │
   ▼
g++
   │
   ▼
app executable
   │
   ▼
stdout/stderr
```

### Java

```text
Main.java
   │
   ▼
javac
   │
   ▼
.class files
   │
   ▼
java Main
   │
   ▼
stdout/stderr
```

---

## 6. Execution Limits

The execution service currently applies several request-level protections.

### Request size

JSON requests are limited to:

```text
100 KB
```

### Source-code size

Source code is limited to:

```text
10,000 characters
```

### Execution timeout

Each execution has a maximum runtime of:

```text
3 seconds
```

### Output buffer

The child-process output is limited to:

```text
512 KB
```

### Rate limiting

The `/execute` endpoint is rate-limited to:

```text
30 requests / minute
```

per client identity.

### Service authentication

The execution endpoint requires an internal API key:

```text
x-api-key
```

The key is stored as an environment variable and is not exposed to the browser.

---

## 7. Temporary Resource Cleanup

After execution completes, the temporary workspace is removed regardless of whether execution succeeds or fails.

Conceptually:

```text
Create workspace
      ↓
Write source
      ↓
Compile / execute
      ↓
Return result
      ↓
Delete workspace
```

Cleanup is performed using a `finally` block so that temporary files are removed after both successful and failed executions.

---

## 8. Execution Result

The execution service returns:

```json
{
  "stdout": "Hello World\n",
  "stderr": ""
}
```

For compilation or runtime failures:

```json
{
  "stdout": "",
  "stderr": "..."
}
```

The Next.js application then converts the result into the format consumed by the editor UI.

---

## 9. Execution History

Execution results can also be persisted through Convex.

The execution record contains information such as:

```text
userId
language
code
output
error
creation time
```

This allows the application to provide:

* execution history
* language usage statistics
* total execution counts
* recent activity
* favorite language statistics

The execution runtime itself remains independent from the persistence layer.

---

## 10. Why the Architecture Is Split

The architecture intentionally separates **application logic** from **code execution**.

```text
Application Layer
        │
        │ authenticated request
        ▼
Execution Layer
        │
        ▼
Language Runtime
```

This provides several benefits:

* the Next.js application does not execute arbitrary code directly
* compiler dependencies remain isolated in the execution container
* execution infrastructure can be scaled independently
* additional languages can be added without modifying the main application runtime
* execution-specific resource limits can be enforced independently
* execution failures do not directly terminate the application process

---

## 11. Current Architecture Limitations

The current implementation is suitable for a portfolio/project environment but is not equivalent to a production-grade sandbox.

The execution process currently relies on operating-system process isolation inside the Docker service.

Potential future improvements include:

* stronger container-level sandboxing
* CPU and memory limits per execution
* process-count limits
* filesystem restrictions
* network isolation
* concurrent execution control
* execution queueing
* compiler/runtime resource monitoring
* centralized execution telemetry
* dedicated worker processes

These improvements can be introduced incrementally without changing the frontend execution API.

---

## Architecture Principle

The main design principle is:

> **Keep code execution isolated from the application layer and expose it through a small authenticated execution boundary.**

This allows the editor, application backend, persistence layer, and execution runtime to evolve independently.
