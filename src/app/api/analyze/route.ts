import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.CODE_ANALYZER!,
});

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code || code.length > 6000) {
      return NextResponse.json(
        { error: "Code too large" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:"You are a senior software engineer performing a strict code review.",
        },
        {
          role: "user",
          content: `Analyze this code and return suggestions for improvement, possible issues, and optionally a refactored version.
          CODE:${code}`,
        },
      ],
    });

    return NextResponse.json({
      analysis: completion.choices[0].message.content,
    });
  } catch {
    return NextResponse.json(
      { error:"Unknown error" },
      { status: 500 }
    );
  }
}