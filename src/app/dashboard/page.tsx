"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const router = useRouter();
  
  // This hook handles authentication and session data
  const { data: session, status } = useSession({
    required: true, // This is the key for protecting the route
    onUnauthenticated() {
      // If the user is not authenticated, redirect them to the sign-in page
      router.push('/api/auth/signin');
    },
  });

  // Show a loading state while the session is being verified
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  
  // If the session is loaded, display the dashboard
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Welcome, {session.user?.name}!
        </h1>
        <p className="text-lg text-muted-foreground">
          This is your protected dashboard. Only authenticated users can see this page.
        </p>
      </div>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>This information is from your Google account.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Image
            src={session.user?.image || ''}
            alt={session.user?.name || 'User avatar'}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className="text-sm">
            <div className="font-medium">{session.user?.name}</div>
            <div className="text-muted-foreground">{session.user?.email}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}