"use client";

import React, { useState, ElementType, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Zap, Home as HomeIcon, Info, Cpu, Menu, X } from "lucide-react";
import { AuthButtons } from "@/components/AuthButtons";
import { motion, AnimatePresence } from "framer-motion";

export function PublicShell() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", icon: HomeIcon, text: "Home" },
    { href: "/pricing", icon: CreditCard, text: "Pricing" },
    { href: "/about", icon: Info, text: "About Us" },
    { href: "/tech", icon: Cpu, text: "The AI Tech" },
  ];

  const NavLink = ({ href, icon: Icon, children }: { href: string; icon: ElementType; children: ReactNode }) => (
    <Link
      href={href}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
        pathname === href ? "text-primary" : "text-foreground hover:bg-muted"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
      {pathname === href && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          layoutId="underline"
        />
      )}
    </Link>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">ApplyFlow</span>
            <Badge variant="outline">Beta</Badge>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} icon={link.icon}>
                {link.text}
              </NavLink>
            ))}
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-background border-b z-40"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    pathname === link.href ? "bg-muted text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.text}</span>
                </Link>
              ))}
              <div className="border-t my-2"></div>
              <div className="flex justify-center p-2">
                <AuthButtons />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

