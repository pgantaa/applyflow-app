"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Added this import
import { FileText, MessageSquare, PlusCircle, UserCircle, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/api/auth/signin');
    },
  });

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  
  // Placeholder data for the user's stats and charts
  const applicationProgress = [
    { week: 'Week 1', applied: 5 },
    { week: 'Week 2', applied: 12 },
    { week: 'Week 3', applied: 9 },
    { week: 'Week 4', applied: 15 },
  ];

  const stats = {
    applicationsSubmitted: 41,
    interviewsScheduled: 3,
    successRate: "7.3%",
    creditsLeft: 89,
  };

  const recentApplications = [
    { job: "Software Engineer at Google", status: "Applied", date: "Aug 24" },
    { job: "Product Manager at Meta", status: "Interview", date: "Aug 22" },
    { job: "Data Analyst at Netflix", status: "Delegated", date: "Aug 21" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {session?.user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s your job search at a glance.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-bold text-lg">{stats.creditsLeft}</div>
            <div className="text-xs text-muted-foreground">Credits Remaining</div>
          </div>
          <Button className="shadow-lg" asChild>
            <Link href="/submit-job"> {/* This should link to your job submission page */}
              <PlusCircle className="mr-2 h-4 w-4" />
              Delegate a New Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications Submitted</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.applicationsSubmitted}</div>
            <p className="text-xs text-muted-foreground">+15 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviewsScheduled}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}</div>
            <p className="text-xs text-muted-foreground">Based on applications sent</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content Area: Application Progress Chart */}
        <div className="lg:col-span-2">
          <Card className="bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Application Progress</CardTitle>
              <CardDescription>Your application volume over the last 4 weeks.</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicationProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line type="monotone" dataKey="applied" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with Profile & Recent Activity */}
        <div className="space-y-8">
          <Card className="bg-background/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              {session?.user?.image ? (
                <Image src={session.user.image} alt="User avatar" width={48} height={48} className="rounded-full" />
              ) : (
                <UserCircle className="h-12 w-12 text-muted-foreground" />
              )}
              <div>
                <CardTitle>{session?.user?.name}</CardTitle>
                <CardDescription>{session?.user?.email}</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-grow">
                    <p className="font-medium">{app.job}</p>
                    <p className="text-sm text-muted-foreground">{app.date}</p>
                  </div>
                  <Badge variant={app.status === 'Interview' ? 'destructive' : 'secondary'}>
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}