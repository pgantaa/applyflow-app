"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2 } from "lucide-react";

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("student");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, status }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // This is the success message shown after the form is submitted
  if (submitted) {
    return (
      <div className="flex items-center justify-center py-12 md:py-24">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl pt-4">You're on the list!</CardTitle>
            <CardDescription>
              Thank you for joining the waitlist. We'll be in touch soon with updates.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // This is the form shown before submission
  return (
    <div className="flex items-center justify-center py-12 md:py-24">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Join the Waitlist</CardTitle>
          <CardDescription>Be the first to know when we launch.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input 
                id="full-name" 
                placeholder="Pranav Ganta" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Mobile Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="(123) 456-7890" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Current Status</Label>
              <RadioGroup 
                defaultValue="student" 
                className="flex items-center space-x-4 pt-1"
                onValueChange={setStatus}
                value={status}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional">Professional</Label>
                </div>
              </RadioGroup>
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <Button type="submit" className="w-full">
              Join Waitlist
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}