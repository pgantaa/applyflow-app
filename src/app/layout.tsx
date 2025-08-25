import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { PublicShell } from "@/components/PublicShell";

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
        <ThemeProvider attribute="class" forcedTheme="light">
          <PublicShell />
          <main>
            {children}
          </main>
          {/* We can add a real footer component here later */}
          <footer className="border-t py-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} ApplyFlow — Human-in-the-loop job applications
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}