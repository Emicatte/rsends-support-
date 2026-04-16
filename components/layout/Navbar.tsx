"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RSendsLogo from "./RSendsLogo";

const navLinks = [
  { href: "/docs/how-it-works", label: "How it Works" },
  { href: "/docs/payments", label: "Payments" },
  { href: "/docs/fees", label: "Fees" },
  { href: "/docs/security", label: "Security" },
  { href: "/docs/troubleshooting", label: "Troubleshooting" },
  { href: "/docs/api-docs", label: "API" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="bf-blur-24s fixed top-0 left-0 right-0 z-[1000]"
      style={{
        height: 60,
        background:
          "linear-gradient(180deg, rgba(10,10,15,0.8) 0%, rgba(10,10,15,0.7) 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <nav
        className="mx-auto flex h-full items-center justify-between"
        style={{ maxWidth: 1400, padding: "0 24px" }}
      >
        {/* Left: Logo + Support */}
        <Link href="/" className="flex items-center gap-3">
          <RSendsLogo size={28} />
          <span
            style={{
              width: 1,
              height: 20,
              background: "rgba(255,255,255,0.1)",
              display: "inline-block",
              marginLeft: 4,
              marginRight: 4,
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 500, color: "#8A8FA8" }}>
            Support
          </span>
        </Link>

        {/* Center: Nav links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "7px 16px",
                  borderRadius: 10,
                  border: "none",
                  background: isActive
                    ? "rgba(255,255,255,0.08)"
                    : "transparent",
                  color: isActive ? "#E2E2F0" : "#8A8FA8",
                  fontFamily: "var(--font-display)",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: CTA — exact product "Connetti Wallet" style */}
        <a
          href="https://rsends.io"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 md:flex"
          style={{
            padding: "8px 16px",
            borderRadius: 20,
            background: "linear-gradient(135deg, #00ffa3, #00cc80)",
            border: "none",
            fontFamily: "var(--font-display)",
            fontSize: 13,
            fontWeight: 700,
            color: "#000",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Open RSends
          <span style={{ fontSize: 11 }}>&#8599;</span>
        </a>
      </nav>
    </header>
  );
}
