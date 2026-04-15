import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";

export const metadata: Metadata = {
  title: {
    default: "RSend Support",
    template: "%s | RSend Support",
  },
  description:
    "Everything you need to understand how RSend works. Documentation, guides, and API reference for the Web3 B2B payment gateway.",
  openGraph: {
    title: "RSend Support",
    description:
      "Documentation and support for RSend — Web3 B2B payment gateway on Base L2.",
    siteName: "RSend Support",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="flex min-h-full flex-col"
        style={{
          background: "#0a0a0f",
          color: "#E2E2F0",
          fontFamily:
            "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <Navbar />
        <main className="flex-1" style={{ paddingTop: 60 }}>
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
