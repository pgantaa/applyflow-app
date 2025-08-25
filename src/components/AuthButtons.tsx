"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => signOut()}>
          Sign Out
        </Button>
        <Link href="/dashboard">
          <Image
            src={session.user?.image || ''}
            alt={session.user?.name || 'User avatar'}
            width={32}
            height={32}
            className="rounded-full"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" onClick={() => signIn("google")}>
        Login
      </Button>
      <Button onClick={() => signIn("google")}>
        Sign Up
      </Button>
    </div>
  );
}