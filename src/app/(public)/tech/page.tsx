"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, FileScan, Sparkles, UserCheck } from "lucide-react";

const techStack = [
  {
    icon: FileScan,
    title: "Job Description Parsing",
    description: "We use advanced OCR and parsing models to instantly deconstruct any job posting, extracting key information like responsibilities, skills, and qualifications.",
    model: "GPT-4o (Omni)",
    gradient: "from-blue-500/50 to-cyan-500/50",
  },
  {
    icon: BrainCircuit,
    title: "Skill & Keyword Extraction",
    description: "Our system identifies the most critical skills and keywords that Applicant Tracking Systems (ATS) and recruiters look for, forming the foundation for tailoring your documents.",
    model: "Claude 3 Sonnet",
    gradient: "from-purple-500/50 to-violet-500/50",
  },
  {
    icon: Sparkles,
    title: "Resume & Cover Letter Generation",
    description: "We fine-tune powerful language models to rewrite bullet points and generate compelling cover letter paragraphs that align your experience directly with the job's requirements.",
    model: "Fine-tuned Llama 3",
    gradient: "from-pink-500/50 to-rose-500/50",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-Loop Review",
    description: "This is our most important step. Every AI-generated document is reviewed, edited, and submitted by a real human assistant to ensure quality, tone, and compliance.",
    model: "Human Expertise",
    gradient: "from-green-500/50 to-emerald-500/50",
  },
];

const MotionCard = motion(Card);

export default function TechPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: "-100%", y: "-100%" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x: `${x}px`, y: `${y}px` });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: "-100%", y: "-100%" });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="text-center space-y-4 mb-16">
        <Badge variant="secondary">Our Technology</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          The Brains Behind Your Application
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We combine the best of AI-powered generation with the critical oversight of human expertise. Here’s a look at how our system works.
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 relative"
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x} ${mousePosition.y}, hsla(0, 0%, 100%, 0.05), transparent 80%)`,
          }}
        />
        {techStack.map((tech, i) => (
          <MotionCard
            key={tech.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-background/70 backdrop-blur-sm rounded-xl overflow-hidden border-spotlight"
          >
            <div
              className={`pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br ${tech.gradient}`}
              style={{
                maskImage: `radial-gradient(300px circle at ${mousePosition.x} ${mousePosition.y}, black, transparent)`,
                WebkitMaskImage: `radial-gradient(300px circle at ${mousePosition.x} ${mousePosition.y}, black, transparent)`,
              }}
            />
            <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-6">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <tech.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold">{tech.title}</CardTitle>
                <Badge variant="outline" className="mt-2 font-mono text-xs">{tech.model}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-muted-foreground text-sm">{tech.description}</p>
            </CardContent>
          </MotionCard>
        ))}
      </div>
    </div>
  );
}