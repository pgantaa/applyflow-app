import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-black">
      <section className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          From All-Nighters to Offer Letters.
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          ApplyFlow wasn&apos;t born in a boardroom. It was built in a dorm room by a student who was tired of the broken job search process—just like you. We believe your life shouldn't pause for the soul-crushing grind of applications. We built the solution we wished we had.
        </p>
      </section>

      <section className="container mx-auto px-6 pb-24">
        {/* Three Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Focus */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 dark:bg-slate-900/50 dark:border-slate-800">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Time & Sanity</span>
            <h3 className="text-2xl font-semibold mt-2 mb-3">
              Focus on What Matters
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your time is your most valuable asset. Delegate the repetitive grind and spend your evenings upskilling, preparing for interviews, or just living your life. We make sure you never miss an opportunity, even when you&apos;re busy making memories.
            </p>
          </div>

          {/* Pillar 2: Technology */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 dark:bg-slate-900/50 dark:border-slate-800">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Technology & Quality</span>
            <h3 className="text-2xl font-semibold mt-2 mb-3">
              Beat the Applicant Tracking System
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Getting past the initial screening is half the battle. Our AI scans job descriptions to identify the keywords that matter, then intelligently weaves them into your resume and cover letter to build a high-impact application designed to stand out.
            </p>
          </div>

          {/* Pillar 3: Partnership */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 dark:bg-slate-900/50 dark:border-slate-800">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Trust & Partnership</span>
            <h3 className="text-2xl font-semibold mt-2 mb-3">
              Your Personal Career Team
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              AI is a powerful tool, but it&apos;s not the whole story. Every application is reviewed by our human assistants, ensuring the quality and nuance that gets you noticed. Think of us as your dedicated job search partner.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button asChild size="lg">
            <Link href="/pricing">
              Delegate Your First Job <MoveRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}