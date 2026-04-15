"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarSection {
  label: string;
  items: { title: string; href: string }[];
}

const sections: SidebarSection[] = [
  {
    label: "Getting Started",
    items: [
      { title: "How it Works", href: "/docs/how-it-works" },
      { title: "Payments", href: "/docs/payments" },
      { title: "Forwarding & Rules", href: "/docs/forwarding" },
    ],
  },
  {
    label: "Details",
    items: [
      { title: "Fees", href: "/docs/fees" },
      { title: "Security", href: "/docs/security" },
    ],
  },
  {
    label: "Help",
    items: [
      { title: "Troubleshooting", href: "/docs/troubleshooting" },
      { title: "API Reference", href: "/docs/api-docs" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[240px] shrink-0 border-r border-border bg-surface lg:block">
      <nav className="sticky top-[60px] flex flex-col gap-6 overflow-y-auto p-6" style={{ maxHeight: "calc(100vh - 60px)" }}>
        {sections.map((section) => (
          <div key={section.label}>
            <p
              className="mb-2 text-dim"
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {section.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative block rounded-lg py-1.5 transition-colors"
                    style={{
                      fontSize: 13,
                      paddingLeft: 12,
                      paddingRight: 8,
                      color: isActive ? "#00ffa3" : undefined,
                    }}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r"
                        style={{
                          width: 2,
                          height: 16,
                          background: "#00ffa3",
                        }}
                      />
                    )}
                    <span className={isActive ? "" : "text-sub hover:text-text"}>
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
