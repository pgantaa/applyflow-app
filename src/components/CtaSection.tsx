"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-center py-16 px-6 rounded-3xl bg-muted/50 border"
    >
      <div className="space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Search?</h2>
        <p className="text-muted-foreground">
          Stop wasting time on repetitive applications. Let us handle the busy work so you can focus on what matters—acing your interviews.
        </p>
        <Button size="lg" className="shadow-lg">
          Get Started Free
        </Button>
      </div>
    </motion.section>
  );
}