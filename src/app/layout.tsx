import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { PublicShell } from "@/components/PublicShell";
import Providers from "@/components/Providers"; // 1. Import your new component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ApplyFlow",
  description: "We apply to jobs for you.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers> {/* 2. Use the new Providers component */}
          <PublicShell />
          <main>
            {children}
          </main>
          <footer className="border-t py-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} ApplyFlow — Human-in-the-loop job applications
          </footer>
        </Providers>
      </body>
    </html>
  );
}