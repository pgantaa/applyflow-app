"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Layers, FileText, Users } from "lucide-react";

const features = [
  {
    value: "scrape",
    title: "Paste Any Job Link",
    description:
      "Our system instantly scrapes and structures any job description in seconds. We pull key requirements, skills, and company details so your assistant has everything they need.",
    icon: Layers,
  },
  {
    value: "tailor",
    title: "AI-Tailored Documents",
    description:
      "Using the scraped data and your profile, we generate custom-tailored resumes and cover letters designed to pass through Applicant Tracking Systems (ATS) and catch a recruiter's eye.",
    icon: FileText,
  },
  {
    value: "apply",
    title: "Human-Powered Application",
    description:
      "A real assistant on our team takes the tailored documents and submits your application manually. This avoids bot detection and ensures any tricky or custom application forms are handled correctly.",
    icon: Users,
  },
];

export function FeaturesTabs() {
  return (
    <section className="text-center space-y-12">
      <div className="space-y-3">
        <Badge variant="secondary">Core Features</Badge>
        <h2 className="text-3xl md:text-4xl font-bold">
          Everything You Need to Get Hired
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          An end-to-end concierge service with full transparency.
        </p>
      </div>

      <Tabs defaultValue="scrape" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scrape">Paste Link</TabsTrigger>
          <TabsTrigger value="tailor">Tailor Docs</TabsTrigger>
          <TabsTrigger value="apply">Human Apply</TabsTrigger>
        </TabsList>

        {features.map((feature) => (
          <TabsContent key={feature.value} value={feature.value}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-left bg-muted/30 rounded-xl p-8 mt-6 border"
            >
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="flex justify-center md:justify-start">
                  <div className="bg-primary/10 text-primary p-4 rounded-lg">
                    <feature.icon className="h-10 w-10" />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2 text-center md:text-left">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}