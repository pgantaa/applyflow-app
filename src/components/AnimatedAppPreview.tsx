"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { FileText, Layers } from 'lucide-react';
import { badgeVariants } from "@/components/ui/badge";
import { type VariantProps } from "class-variance-authority";

export type Status = "saved" | "delegated" | "applied" | "interview" | "on_hold";

const statuses: { status: Status; label: string; variant: VariantProps<typeof badgeVariants>["variant"] }[] = [  { status: 'saved', label: 'Saved', variant: 'secondary' },
  { status: 'delegated', label: 'Delegated', variant: 'default' },
  { status: 'applied', label: 'Applied', variant: 'outline' },
];

export function AnimatedAppPreview() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % statuses.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto mt-8 md:mt-0">
      <div className="absolute -inset-2 bg-primary/10 rounded-full blur-3xl dark:bg-primary/20"></div>
      <div className="relative rounded-3xl border border-dashed p-4 bg-background/50 backdrop-blur-sm">
        <div className="rounded-2xl border bg-background p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-lg">My Applications</div>
            <Badge variant="outline" className="rounded-full">2 credits left</Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 rounded-xl border bg-muted/50 text-sm">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <span>Product Manager at Meta</span>
              <Badge variant="destructive" className="ml-auto">Interview</Badge>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={statuses[index].status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 p-3 rounded-xl border bg-muted/50 text-sm"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Software Engineer at Google</span>
                <Badge variant={statuses[index].variant} className="ml-auto w-20 justify-center transition-colors duration-500">
                  {statuses[index].label}
                </Badge>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}