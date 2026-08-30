import { CodeEditorState } from "./../types/index";
import { create } from "zustand";
import { ExecutionResult } from "@/types";
import { Monaco } from "@monaco-editor/react";

const getInitialState = () => {
  // if we're on the server, return default values
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  // if we're on the client, return values from local storage becoz localStorage is a browser API.
  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16;

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);

      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      // Save current language code before switching
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
        executionResult: null,
      });
    },

    runCode: async (): Promise<ExecutionResult> => {
      const { language, getCode } = get();
      const code = getCode();

      // Empty code
      if (!code.trim()) {
        const result: ExecutionResult = {
          code: "",
          output: "",
          error: "Please enter some code",
          status: "failed",
          executionTimeMs: 0,
        };

        set({
          error: result.error,
          executionResult: result,
        });

        return result;
      }

      set({
        isRunning: true,
        error: null,
        output: "",
        executionResult: null,
      });

      // Start execution timer
      const startTime = performance.now();

      try {
        const response = await fetch("/api/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language,
            code,
          }),
        });

        const data = await response.json();

        const executionTimeMs = Math.round(
          performance.now() - startTime
        );

        if (!response.ok) {
          throw new Error(data.error || "Execution failed");
        }

        // Handle timeout
        if (data.status === "timeout") {
          const error = "Execution timed out after 3 seconds";

          const result: ExecutionResult = {
            code,
            output: "",
            error,
            status: "timeout",
            executionTimeMs,
          };

          set({
            output: "",
            error,
            executionResult: result,
          });

          return result;
        }

        // Handle compilation/runtime failure
        if (data.status === "failed") {
          const error =
            data.stderr ||
            data.error ||
            "Execution failed";

          const result: ExecutionResult = {
            code,
            output: "",
            error,
            status: "failed",
            executionTimeMs,
          };

          set({
            output: "",
            error,
            executionResult: result,
          });

          return result;
        }

        // Successful execution
        const output = data.stdout || "";

        const result: ExecutionResult = {
          code,
          output: output.trim(),
          error: null,
          status: "success",
          executionTimeMs,
        };

        set({
          output: result.output,
          error: null,
          executionResult: result,
        });

        return result;
      } catch (error) {
        const executionTimeMs = Math.round(
          performance.now() - startTime
        );

        const executionError =
          error instanceof Error
            ? error.message
            : "Execution failed";

        const result: ExecutionResult = {
          code,
          output: "",
          error: executionError,
          status: "failed",
          executionTimeMs,
        };

        set({
          output: "",
          error: executionError,
          executionResult: result,
        });

        return result;
      } finally {
        set({
          isRunning: false,
        });
      }
    },
  };
}
);