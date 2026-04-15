"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RSendLogo from "./RSendLogo";

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
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 60,
        background: "rgba(10, 10, 15, 0.8)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <nav className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6">
        {/* Left: Logo + Support */}
        <Link href="/" className="flex items-center gap-3">
          <RSendLogo size={28} />
          <span
            className="text-dim"
            style={{
              width: 1,
              height: 20,
              background: "rgba(255,255,255,0.1)",
              display: "inline-block",
              marginLeft: 4,
              marginRight: 4,
            }}
          />
          <span className="text-sub" style={{ fontSize: 13, fontWeight: 500 }}>
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
                className="transition-colors"
                style={{
                  padding: "7px 16px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 500,
                  color: isActive ? "#E2E2F0" : "#8A8FA8",
                  background: isActive
                    ? "rgba(255,255,255,0.08)"
                    : "transparent",
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

        {/* Right: CTA */}
        <a
          href="https://rsends.io"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1 md:flex"
          style={{
            background: "linear-gradient(135deg, #00ffa3, #00cc80)",
            color: "#000",
            fontWeight: 700,
            fontSize: 12,
            borderRadius: 20,
            padding: "8px 18px",
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
