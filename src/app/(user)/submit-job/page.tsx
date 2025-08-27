"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SubmitJobPage() {
  const router = useRouter();
  const [jobLink, setJobLink] = useState("");
  const [resumeType, setResumeType] = useState("");
  const [priority, setPriority] = useState("normal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/submit-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobLink, resumeType, priority }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong.');
      }
      
      setSubmitted(true);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center py-12 md:py-24">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl pt-4">Job Delegated!</CardTitle>
            <CardDescription>
              Your job has been added to the queue. An assistant will begin working on it shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Delegate a New Job
        </h1>
        <p className="text-muted-foreground">
          Submit a job link and let us handle the rest. This will use one of your credits.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* Job Application Link */}
            <div className="grid gap-2">
              <Label htmlFor="job-link" className="font-semibold">Job Application Link</Label>
              <Input 
                id="job-link" 
                placeholder="https://www.linkedin.com/jobs/view/..." 
                required 
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
              />
            </div>

            {/* Resume Selection Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="resume-type" className="font-semibold">Which Resume to Use?</Label>
              <Select onValueChange={setResumeType} required>
                <SelectTrigger id="resume-type">
                  <SelectValue placeholder="Select a resume profile..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Tech Resume (General)</SelectItem>
                  <SelectItem value="ml">Machine Learning Resume</SelectItem>
                  <SelectItem value="fullstack">Full Stack Resume</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority Level */}
            <div className="grid gap-2">
              <Label className="font-semibold">Priority Level</Label>
              <RadioGroup 
                defaultValue="normal" 
                className="grid grid-cols-3 gap-4 pt-2"
                onValueChange={setPriority}
                value={priority}
              >
                <div>
                  <RadioGroupItem value="normal" id="normal" className="peer sr-only" />
                  <Label htmlFor="normal" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Normal
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="high" id="high" className="peer sr-only" />
                  <Label htmlFor="high" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    High
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="vhigh" id="vhigh" className="peer sr-only" />
                  <Label htmlFor="vhigh" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    V. High
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Delegating..." : "Delegate Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
