import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GraphOne Data Intelligence",
  description: "Global Intelligence Graph for the AI and venture ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Global Navigation */}
        <nav className="fixed w-full top-0 z-50 bg-sohub-white/90 backdrop-blur-md border-b border-sohub-border flex items-center justify-between px-6 py-4 transition-all duration-300">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sohub-black flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-sohub-white"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-sohub-black">GraphOne</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/startups" className="text-sohub-grey hover:text-sohub-black transition-colors">Startups</Link>
            <Link href="/products" className="text-sohub-grey hover:text-sohub-black transition-colors">Products</Link>
            <Link href="/papers" className="text-sohub-grey hover:text-sohub-black transition-colors">Papers</Link>
            <Link href="/signals" className="text-sohub-grey hover:text-sohub-black transition-colors">Signals</Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sohub-soft-grey border border-sohub-border">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-medium text-sohub-black">System Online</span>
            </div>
          </div>
        </nav>
        <main className="min-h-screen pt-24 bg-sohub-soft-grey flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
