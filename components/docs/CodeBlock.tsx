"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {(title || language) && (
        <div
          className="flex items-center justify-between"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "#111118",
            padding: "8px 16px",
          }}
        >
          <span className="text-dim" style={{ fontSize: 11, fontWeight: 500 }}>
            {title || language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-dim transition-colors hover:text-sub"
            style={{ fontSize: 11 }}
          >
            {copied ? (
              <>
                <Check size={12} />
                Copied
              </>
            ) : (
              <>
                <Copy size={12} />
                Copy
              </>
            )}
          </button>
        </div>
      )}
      <pre
        style={{
          background: "#0d0d14",
          padding: 16,
          overflowX: "auto",
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: "var(--font-mono)",
        }}
      >
        <code style={{ color: "#E2E2F0" }}>{code}</code>
      </pre>
    </div>
  );
}
