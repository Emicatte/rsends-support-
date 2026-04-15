import { NextRequest, NextResponse } from "next/server";
import {
  SYSTEM_PROMPT,
  isBlockedQuery,
  BLOCKED_RESPONSE,
} from "@/lib/chat-config";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MAX_MESSAGES = 10;

export async function POST(req: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Chat not configured" }, { status: 500 });
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
  }

  const lastMessage = messages[messages.length - 1]?.content ?? "";

  if (isBlockedQuery(lastMessage)) {
    return NextResponse.json({ response: BLOCKED_RESPONSE });
  }

  const trimmed = messages.slice(-MAX_MESSAGES);

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: trimmed.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json({
        response:
          "I'm having trouble connecting right now. Please check our documentation pages directly, or try again in a moment.",
      });
    }

    const data = await res.json();
    const text =
      data.content?.[0]?.text ?? "Sorry, I couldn't generate a response.";

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({
      response:
        "I'm temporarily unavailable. Please browse our documentation pages for help.",
    });
  }
}
