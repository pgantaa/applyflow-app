"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileStack, Clock, CheckCircle, Hourglass, ArrowRight } from "lucide-react";
import Link from "next/link"; // 1. Import the Link component

export default function AssistantDashboardPage() {
  const router = useRouter();
  
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/assistant');
    },
  });

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  
  // Placeholder data for the assistant's stats
  const stats = {
    pendingInQueue: 12,
    jobsAppliedToday: 23,
    avgApplicationsPerDay: 21.5,
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Assistant Console
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {session?.user?.email}!
          </p>
        </div>
        {/* 2. Update the button to be a link */}
        <Button className="shadow-lg" asChild>
          <Link href="/assistant/queue">
            Open Job Queue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending in Queue</CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingInQueue}</div>
            <p className="text-xs text-muted-foreground">Jobs waiting for processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs Applied Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.jobsAppliedToday}</div>
            <p className="text-xs text-muted-foreground">+5 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Apps Per Day</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgApplicationsPerDay.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Based on the last 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* The Job Queue component will go here later */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Job Queue</h2>
        <Card className="text-center py-12">
          <CardContent>
            <FileStack className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">The Job Queue is Empty</h3>
            <p className="text-sm text-muted-foreground">Click "Open Job Queue" to view and process applications.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
