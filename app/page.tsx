"use client";

import Link from "next/link";
import {
  Zap,
  CreditCard,
  Percent,
  Shield,
  AlertTriangle,
  Code,
  MessageCircle,
  LucideIcon,
} from "lucide-react";

interface CardData {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  iconColor: string;
}

const cards: CardData[] = [
  {
    title: "How it Works",
    description: "Understand the complete payment pipeline",
    icon: Zap,
    href: "/docs/how-it-works",
    iconColor: "#8B5CF6",
  },
  {
    title: "Payments",
    description: "Receiving payments and payment intents",
    icon: CreditCard,
    href: "/docs/payments",
    iconColor: "#3B82F6",
  },
  {
    title: "Fees",
    description: "Transaction fees, gas costs, examples",
    icon: Percent,
    href: "/docs/fees",
    iconColor: "#00D68F",
  },
  {
    title: "Security",
    description: "How we protect your funds",
    icon: Shield,
    href: "/docs/security",
    iconColor: "#FFB547",
  },
  {
    title: "Troubleshooting",
    description: "Common issues and solutions",
    icon: AlertTriangle,
    href: "/docs/troubleshooting",
    iconColor: "#FF4C6A",
  },
  {
    title: "API Reference",
    description: "Merchant integration endpoints",
    icon: Code,
    href: "/docs/api-docs",
    iconColor: "#00ffa3",
  },
];

export default function Home() {
  return (
    <div
      className="mx-auto max-w-5xl px-6 py-24 md:py-32"
      style={{ position: "relative", zIndex: 10 }}
    >
      {/* Hero */}
      <div className="rp-stagger-1 text-center">
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            background:
              "linear-gradient(135deg, #FFFFFF 0%, #60A5FA 60%, #1D4ED8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          RSends Support
        </h1>
        <p
          className="mx-auto mt-4 max-w-md"
          style={{ fontSize: 15, color: "#8A8FA8" }}
        >
          Everything you need to understand how RSends works.
        </p>
      </div>

      {/* Card Grid */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <Link
            key={card.href}
            href={card.href}
            className={`rp-stagger-${i + 1} group block transition-all duration-200 hover:-translate-y-0.5`}
            style={{
              background: "#111118",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: 24,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.boxShadow =
                "0 24px 80px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <card.icon
              style={{ color: card.iconColor }}
              className="mb-3"
              size={24}
            />
            <h2
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#E2E2F0",
              }}
            >
              {card.title}
            </h2>
            <p
              className="mt-1"
              style={{ fontSize: 13, lineHeight: 1.5, color: "#8A8FA8" }}
            >
              {card.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div
        className="rp-stagger-5 mx-auto my-16 max-w-xs"
        style={{ height: 1, background: "rgba(255,255,255,0.06)" }}
      />

      {/* Need Help */}
      <div className="rp-stagger-6 text-center">
        <p
          className="mb-4"
          style={{ fontSize: 14, fontWeight: 500, color: "#8A8FA8" }}
        >
          Need help?
        </p>
        <button
          type="button"
          style={{
            background: "rgba(0,255,163,0.08)",
            border: "1px solid rgba(0,255,163,0.2)",
            color: "#00ffa3",
            borderRadius: 12,
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
          className="inline-flex items-center gap-2 transition-colors hover:bg-[rgba(0,255,163,0.12)]"
        >
          <MessageCircle size={15} />
          Ask RSends AI
        </button>
      </div>
    </div>
  );
}
