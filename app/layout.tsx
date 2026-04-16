import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "RSend Support",
    template: "%s | RSend Support",
  },
  description:
    "Everything you need to understand how RSend works. Documentation, guides, and API reference for the Web3 B2B payment gateway.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
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
    <html
      lang="en"
      className={`${inter.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body
        className={`${inter.className} flex min-h-full flex-col`}
        style={{ background: "#0a0a0f", color: "#e2e2f0" }}
      >
        {/* Background orb system — matches product's animated light sources */}
        <div className="rp-bg">
          <div className="rp-bg__base" />
          <div className="rp-bg__orbs">
            <div className="rp-orb rp-orb--1" />
            <div className="rp-orb rp-orb--2" />
            <div className="rp-orb rp-orb--3" />
            <div className="rp-orb rp-orb--4" />
          </div>
          <div className="rp-bg__blur" />
          <div className="rp-bg__noise" />
        </div>

        <Navbar />
        <main
          className="flex-1"
          style={{ paddingTop: 60, position: "relative", zIndex: 1 }}
        >
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
