"use client";

import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import PageTransition from "@/components/layout/PageTransition";
import { ReactNode } from "react";

interface DocLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  section?: string;
  toc?: { id: string; label: string }[];
}

export default function DocLayout({
  children,
  title,
  subtitle,
  toc,
}: DocLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-60px)]">
      <Sidebar />

      <div className="flex min-w-0 flex-1">
        {/* Content */}
        <article className="mx-auto w-full max-w-[720px] px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-1.5" style={{ fontSize: 12 }}>
            <Link
              href="/"
              className="text-dim transition-colors hover:text-sub"
            >
              Support
            </Link>
            <span className="text-dim">/</span>
            <span className="text-sub">{title}</span>
          </div>

          <PageTransition>
            <h1
              className="text-text"
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: subtitle ? 8 : 32,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-sub" style={{ fontSize: 14, marginBottom: 32 }}>
                {subtitle}
              </p>
            )}
            <div
              className="text-text"
              style={{ fontSize: 15, lineHeight: 1.7 }}
            >
              <div className="space-y-6">{children}</div>
            </div>
          </PageTransition>
        </article>

        {/* Table of Contents (desktop) */}
        {toc && toc.length > 0 && (
          <aside className="hidden w-48 shrink-0 pt-8 pr-6 xl:block">
            <div className="sticky top-[84px]">
              <p
                className="mb-3 text-dim"
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                On this page
              </p>
              <nav className="flex flex-col gap-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sub transition-colors hover:text-text"
                    style={{ fontSize: 12 }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
