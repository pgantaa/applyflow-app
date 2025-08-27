"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Define a type for the job object
type Job = {
  id: number;
  user_email: string;
  job_link: string;
  resume_type: string;
  priority: string;
  status: string;
  submitted_at: string;
};

export default function JobQueuePage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useSession({
    required: true,
    onUnauthenticated() {
      router.push('/assistant');
    },
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs.');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading job queue...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen"><p className="text-red-500">{error}</p></div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/assistant/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Job Queue</h1>
        <p className="text-muted-foreground">
          Jobs delegated by users, sorted by submission time.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Email</TableHead>
                <TableHead>Job Link</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.user_email}</TableCell>
                    <TableCell>
                      <a href={job.job_link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        View Job
                      </a>
                    </TableCell>
                    <TableCell>{job.resume_type}</TableCell>
                    <TableCell>
                      <Badge variant={job.priority === 'vhigh' ? 'destructive' : 'secondary'}>
                        {job.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.status}</TableCell>
                    <TableCell>{new Date(job.submitted_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    The job queue is empty.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}