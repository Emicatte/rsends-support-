"use client";

import { useState, useRef, useEffect, useCallback, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowUpRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "How do payments work?",
  "What are the fees?",
  "My transaction failed",
];

function linkify(text: string) {
  const parts: (string | { href: string; label: string })[] = [];
  const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = mdLinkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({ label: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const parts = isUser ? [message.content] : linkify(message.content);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[85%] px-4 py-2.5"
        style={{
          borderRadius: 16,
          fontSize: 13,
          lineHeight: 1.6,
          background: isUser ? "#00ffa3" : "#16161f",
          color: isUser ? "#000" : "#E2E2F0",
        }}
      >
        {parts.map((part, i) =>
          typeof part === "string" ? (
            <span key={i} className="whitespace-pre-wrap">
              {part}
            </span>
          ) : (
            <a
              key={i}
              href={part.href}
              className="inline-flex items-center gap-0.5 underline underline-offset-2"
              style={{
                color: isUser ? "rgba(0,0,0,0.7)" : "#00ffa3",
              }}
            >
              {part.label}
              <ArrowUpRight size={11} />
            </a>
          )
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="flex items-center gap-1.5 px-4 py-3"
        style={{ borderRadius: 16, background: "#16161f" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block rounded-full"
            style={{ width: 6, height: 6, background: "rgba(255,255,255,0.3)" }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const sendMessage = async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content:
          data.response ??
          data.error ??
          "Sorry, something went wrong. Please try again.",
      };
      setMessages([...nextMessages, assistantMsg]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "I'm temporarily unavailable. Please browse our documentation pages for help.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    sendMessage(trimmed);
  };

  return (
    <>
      {/* Trigger Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center transition-transform hover:scale-105"
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00ffa3, #00cc80)",
              boxShadow: "0 8px 32px rgba(0,255,163,0.25)",
            }}
            aria-label="Open chat"
          >
            <MessageCircle size={22} color="#000" />
            <span
              className="absolute flex items-center justify-center rounded-full"
              style={{
                top: -4,
                right: -4,
                width: 20,
                height: 20,
                background: "#0a0a0f",
                border: "2px solid #0a0a0f",
                fontSize: 9,
                fontWeight: 800,
                color: "#00ffa3",
              }}
            >
              AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 flex max-w-[calc(100vw-2rem)] flex-col overflow-hidden"
            style={{
              width: 380,
              height: 520,
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "#0a0a0f",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5"
              style={{
                height: 56,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 32,
                    height: 32,
                    background: "rgba(0,255,163,0.1)",
                  }}
                >
                  <MessageCircle size={15} color="#00ffa3" />
                </div>
                <div>
                  <p
                    className="text-text"
                    style={{ fontSize: 13, fontWeight: 600 }}
                  >
                    RSends AI Support
                  </p>
                  <p className="text-dim" style={{ fontSize: 11 }}>
                    Ask anything about RSends
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-lg text-dim transition-colors hover:text-sub"
                style={{ width: 32, height: 32 }}
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.length === 0 && !loading && (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 48,
                      height: 48,
                      background: "rgba(0,255,163,0.08)",
                    }}
                  >
                    <MessageCircle size={22} color="#00ffa3" />
                  </div>
                  <div>
                    <p
                      className="text-text"
                      style={{ fontSize: 14, fontWeight: 500 }}
                    >
                      How can I help?
                    </p>
                    <p className="mt-1 text-dim" style={{ fontSize: 12 }}>
                      Ask about payments, fees, API, or anything RSends.
                    </p>
                  </div>
                  <div className="flex w-full max-w-[260px] flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className="text-left transition-colors"
                        style={{
                          borderRadius: 12,
                          border: "1px solid rgba(255,255,255,0.06)",
                          background: "#111118",
                          padding: "10px 14px",
                          fontSize: 12,
                          color: "#E2E2F0",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(0,255,163,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.06)";
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}

              {loading && <TypingIndicator />}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                padding: "12px 16px",
              }}
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={loading}
                  className="flex-1 outline-none disabled:opacity-50"
                  style={{
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "#111118",
                    padding: "10px 14px",
                    fontSize: 13,
                    color: "#E2E2F0",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,255,163,0.3)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex shrink-0 items-center justify-center transition-opacity disabled:opacity-30"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "#00ffa3",
                  }}
                  aria-label="Send message"
                >
                  <Send size={15} color="#000" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
