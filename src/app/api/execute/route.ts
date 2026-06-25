import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { language, code } = await req.json();

    const response = await fetch(process.env.CODE_RUNNER!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.EXECUTOR_API_KEY!,
      },
      body: JSON.stringify({
        language,
        code,
      }),
    });

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Execution Error:", error);

    return NextResponse.json(
      {
        error: "Execution failed",
      },
      {
        status: 500,
      }
    );
  }
}