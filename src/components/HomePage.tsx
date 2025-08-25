"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Removed CardTitle
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { AnimatedAppPreview } from "@/components/AnimatedAppPreview";
import { LogoCloud } from "@/components/LogoCloud";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { CtaSection } from "@/components/CtaSection";
import Link from "next/link";

const MotionCard = motion(Card);

export default function HomePage() {
  // The 'features' array was removed as it was unused.

  const testimonials = [
    // Corrected unescaped characters in the quotes
    { quote: "ApplyFlow saved me 10+ hours a week. I went from 0 interviews to 5 in the first month!", name: "Sarah J.", role: "Product Manager" },
    { quote: "The quality of the tailored resumes is insane. It's like having a personal career coach.", name: "Michael B.", role: "Software Engineer" },
    { quote: "Finally, a service that just works. I delegated my entire job search and focused on prepping for interviews.", name: "Emily L.", role: "UX Designer" },
  ];
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 space-y-24 md:space-y-32 my-12 md:my-24">
      {/* 1. Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-center md:text-left"
        >
          <Badge variant="outline" className="py-1 px-3 border-primary/50 text-primary">Beta v1.2 Now Live!</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-black to-slate-500 bg-clip-text text-transparent dark:from-slate-200 dark:to-slate-500">
            Stop Applying. Start Interviewing.
          </h1>
          <p className="text-lg text-muted-foreground">
            We apply to jobs for you — with customized resumes &amp; cover letters. Human assistants + AI tailoring. No bots to get you banned.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Button size="lg" className="shadow-lg" asChild>
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">See Pricing</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Format-locked resumes</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Manual submissions</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <AnimatedAppPreview />
        </motion.div>
      </section>

      {/* 2. Logo Cloud (Social Proof) */}
      <LogoCloud />

      {/* 3. How It Works Section */}
      <HowItWorksSection/>

      {/* 5. Testimonials Section */}
      <section className="text-center space-y-12">
        <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Loved by Job Seekers Everywhere</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">Don&apos;t just take our word for it. Here&apos;s what people are saying.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
             <MotionCard 
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col text-left bg-background/50 backdrop-blur-sm"
            >
              <CardContent className="pt-6 flex-grow">
                <p className="italic">&quot;{t.quote}&quot;</p>
              </CardContent>
              <CardHeader>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </CardHeader>
            </MotionCard>
          ))}
        </div>
      </section>

      {/* 6. Final CTA Section */}
      <CtaSection />
    </div>
  );
}