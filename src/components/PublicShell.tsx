"use client";

import React, { ElementType, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Zap, Home as HomeIcon, Info, Cpu, MoreHorizontal } from "lucide-react"; // Added MoreHorizontal icon

export function PublicShell() {
  const pathname = usePathname();

  const NavLink = ({ href, icon: Icon, children }: { href: string; icon: ElementType; children: ReactNode }) => (
    <Link href={href} className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted ${pathname === href ? "text-primary bg-muted" : "text-foreground"}`}>
      <Icon className="h-4 w-4" /> {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-background/80 border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5 text-primary" />
          <span className="font-semibold">ApplyFlow</span>
          {/* The "Beta" badge next to the logo has been removed */}
        </div>
        <nav className="hidden md:flex items-center gap-2">
          <NavLink href="/" icon={HomeIcon}>Home</NavLink>
          <NavLink href="/pricing" icon={CreditCard}>Pricing</NavLink>
          <NavLink href="/about" icon={Info}>About Us</NavLink>
          <NavLink href="/tech" icon={Cpu}>The AI Tech</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          {/* Buttons for larger screens */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
            <Button asChild><Link href="/signup">Sign Up</Link></Button>
          </div>
          {/* Menu for smaller screens */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}