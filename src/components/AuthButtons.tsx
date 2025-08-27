"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { UserCircle } from "lucide-react";

export function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => signOut()}>
          Sign Out
        </Button>
        <Link href="/dashboard">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User avatar'}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <UserCircle className="h-8 w-8 text-muted-foreground" />
          )}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Updated to redirect to the dashboard after login */}
      <Button variant="ghost" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        Login
      </Button>
      <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        Sign Up
      </Button>
    </div>
  );
}