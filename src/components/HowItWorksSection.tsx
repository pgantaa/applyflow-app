"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserRound, FileText, Send } from 'lucide-react'; // More direct icons

const MotionCard = motion(Card);

const steps = [
    {
        step: "1",
        title: "Tell Us About Yourself",
        description: "Share your profile, preferences, and goals on a short onboarding call.",
        content: (
            <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="rounded-full bg-background/50">Matthew A.</Badge>
                <Badge variant="outline" className="rounded-full bg-background/50">$260K target</Badge>
            </div>
        ),
        bgClass: "bg-amber-50 dark:bg-amber-950/30",
        glowClass: "bg-amber-200/60 dark:bg-amber-500/30",
        icon: UserRound,
    },
    {
        step: "2",
        title: "Select Your Dream Jobs",
        description: "Handpick & delegate your favorites in a single click.",
        content: (
            <div className="grid gap-2 text-sm w-full">
                <div className="rounded-xl border bg-background/50 p-3 flex items-center justify-between text-left">
                    <div className="flex items-center gap-2"><FileText className="h-4 w-4"/> Product Manager</div>
                    <Badge variant="outline">$160k–200k</Badge>
                </div>
                <div className="rounded-xl border bg-background/50 p-3 flex items-center justify-between text-left">
                    <div className="flex items-center gap-2"><FileText className="h-4 w-4"/> Software Engineer</div>
                    <Badge variant="outline">$130k–180k</Badge>
                </div>
            </div>
        ),
        bgClass: "bg-pink-50 dark:bg-pink-950/30",
        glowClass: "bg-pink-200/60 dark:bg-pink-500/30",
        icon: FileText,
    },
    {
        step: "3",
        title: "We Apply For You",
        description: "Your dedicated assistant applies within 12–24 hours—guaranteed.",
        content: (
            <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-900 px-2 py-1 text-emerald-800 dark:text-emerald-200">Delegated (3)</span>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-900 px-2 py-1 text-emerald-800 dark:text-emerald-200">Applied (16)</span>
            </div>
        ),
        bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
        glowClass: "bg-emerald-200/60 dark:bg-emerald-500/30",
        icon: Send,
    },
];

export function HowItWorksSection() {
    return (
        <section className="space-y-16">
            <div className="text-center space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold">A Simpler Path to Your Next Role</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">Just three simple steps to get started.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-x-8 gap-y-16 relative">
                {steps.map((item, i) => (
                    <div key={i} className="relative flex flex-col items-center">
                        <MotionCard
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative overflow-hidden rounded-xl border ${item.bgClass} w-full flex-grow flex flex-col`}
                        >
                            <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${item.glowClass}`} />
                            <CardHeader className="items-center text-center">
                                <div className="rounded-full bg-background/50 p-3 mb-4 border">
                                    <item.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-center flex flex-col items-center flex-grow justify-between">
                                <p className="text-muted-foreground text-sm max-w-xs">{item.description}</p>
                                <div className="pt-4 w-full">
                                    {item.content}
                                </div>
                            </CardContent>
                        </MotionCard>
                        {i < steps.length - 1 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 left-full hidden md:block"
                                aria-hidden="true"
                            >
                                <svg className="mx-4" width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 12H46M46 12L38 4M46 12L38 20" stroke="hsl(var(--border))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}