import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Plus, Search, Star, Trash2, MoreHorizontal, CheckCircle2, Clock,
  UserRound, Building2, ChevronRight, BookOpen, Layers, FileText,
  Home as HomeIcon, CreditCard, HelpCircle, Library, Zap, Users,
  BarChart2, Settings, ClipboardList, ArrowLeft
} from "lucide-react";

/**
 * FULL JOB APP (SPA) for Canvas Preview
 * - Public: Home, Pricing, FAQ, Tools, Resources
 * - User App: Dashboard, Submit Job, Applications (list/detail), Resume, Profile
 * - Assistant Console: Queue + Detail
 * - Admin: Overview
 *
 * Notes:
 * - Single-file SPA for Canvas preview (no external routing). Use top-level nav + state.
 * - Replace API stubs with real endpoints later.
 */

// ---------------- Types ----------------
export type Status = "saved" | "delegated" | "applied" | "interview" | "on_hold";
export type JobRow = {
  id: string; title: string; company: string; delegatedOn?: string; status: Status; starred?: boolean; sourceUrl?: string;
};

// ---------------- Mock Data ----------------
const MOCK_JOBS: JobRow[] = [
  { id: "S293462", title: "Product Manager", company: "Meta", delegatedOn: "2024-12-30", status: "delegated", starred: true, sourceUrl: "https://linkedin.com/jobs/123" },
  { id: "S293460", title: "Business Operations Analyst (Starlink)", company: "SpaceX", delegatedOn: "2024-12-28", status: "delegated", starred: false },
  { id: "S293519", title: "Product Manager, Generative AI", company: "Google", delegatedOn: "2024-12-27", status: "on_hold" },
  { id: "S293512", title: "Data Scientist", company: "NA", delegatedOn: "2024-12-26", status: "saved" },
  { id: "S293488", title: "Product Analyst", company: "Prime Video", delegatedOn: "2024-12-25", status: "applied" },
  { id: "S293401", title: "Business Analyst I", company: "Prime Healthcare", delegatedOn: "2024-12-24", status: "delegated" },
  { id: "S293380", title: "Transformation Analyst", company: "Intel", delegatedOn: "2024-12-22", status: "saved" },
  { id: "S293377", title: "Business Planning Sr. Analyst", company: "NA", delegatedOn: "2024-12-20", status: "interview" },
];

// ---------------- Helpers ----------------
const statusBadge = (s: Status) => {
  const map: Record<Status, { label: string; variant: any }> = {
    saved: { label: "Saved", variant: "secondary" },
    delegated: { label: "Delegated", variant: "default" },
    applied: { label: "Applied", variant: "outline" },
    interview: { label: "Interview", variant: "destructive" },
    on_hold: { label: "On Hold", variant: "secondary" },
  };
  const m = map[s];
  return <Badge variant={m.variant}>{m.label}</Badge>;
};

async function apiAddJob(url: string): Promise<JobRow> {
  await new Promise((r) => setTimeout(r, 300));
  let host = "Job"; try { host = new URL(url).hostname; } catch {}
  return { id: `S${Math.floor(Math.random()*900000+100000)}`, title: "New Role (Scraped)", company: host, delegatedOn: new Date().toISOString(), status: "saved", sourceUrl: url };
}

// ---------------- UI: Public Pages ----------------
function PublicShell({ page, setPage }: { page: string; setPage: (p: string)=>void }){
  const NavLink = ({to, icon:Icon, children}:{to:string; icon:any; children:any}) => (
    <button onClick={()=>setPage(to)} className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted ${page===to?"text-primary":"text-foreground"}`}>
      <Icon className="h-4 w-4"/> {children}
    </button>
  );
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-background/80 border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5 text-primary"/>
          <span className="font-semibold">ApplyFlow</span>
          <Badge variant="outline" className="ml-2">Beta</Badge>
        </div>
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="home" icon={HomeIcon}>Home</NavLink>
          <NavLink to="pricing" icon={CreditCard}>Pricing</NavLink>
          <NavLink to="faq" icon={HelpCircle}>FAQ</NavLink>
          <NavLink to="tools" icon={Layers}>Tools</NavLink>
          <NavLink to="resources" icon={Library}>Resources</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={()=>setPage("user.app")}>Open App</Button>
          <Button onClick={()=>setPage("assistant.queue")} variant="default">Assistant</Button>
        </div>
      </div>
    </header>
  );
}

function HomePage({ setPage }:{ setPage:(p:string)=>void }){
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Hero (left copy + right live preview) */}
      <section className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            We apply to jobs for you — with customized resumes & cover letters.
          </h1>
          <p className="text-muted-foreground">
            Paste job links, track progress, get interviews. Human assistants + AI tailoring. No bots to get you banned.
          </p>
          <div className="flex gap-3">
            <Button size="lg" onClick={()=>setPage("user.app")}>Get Started</Button>
            <Button size="lg" variant="outline" onClick={()=>setPage("pricing")}>See Pricing</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4"/> Format-locked tailored resumes</div>
            <div className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4"/> Manual submission by assistants</div>
          </div>
        </div>
        <div>
          <div className="rounded-3xl border border-dashed p-4">
            <div className="rounded-2xl border p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium">Applications</div>
                <Badge className="rounded-full">89 credits left</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><ClipboardList className="h-4 w-4"/> Submit link → Scrape JD</div>
                <div className="flex items-center gap-2"><FileText className="h-4 w-4"/> Tailored resume + cover letter</div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4"/> Human assistant applies</div>
                <div className="flex items-center gap-2"><BarChart2 className="h-4 w-4"/> Track status → Interview</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards (subtle, soft) */}
      <section className="grid md:grid-cols-3 gap-6">
        {["Paste job link","Tailored docs","Human apply"].map((t,i)=> (
          <Card key={i} className="hover:shadow-sm transition-shadow rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">{t}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">End-to-end concierge with transparency and control.</CardContent>
          </Card>
        ))}
      </section>

      {/* 3‑step showcase (pastel blocks) */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <Card className="relative overflow-hidden bg-amber-50">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-200/60 blur-2xl" />
          <CardHeader className="pb-3">
            <Badge variant="secondary" className="rounded-full w-fit">1</Badge>
            <CardTitle className="text-xl">Tell us about yourself</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Share your profile, preferences and goals on a short onboarding call.</p>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline" className="rounded-full">Matthew A.</Badge>
              <Badge variant="outline" className="rounded-full">$260K target</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="relative overflow-hidden bg-pink-50">
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-pink-200/60 blur-2xl" />
          <CardHeader className="pb-3">
            <Badge variant="secondary" className="rounded-full w-fit">2</Badge>
            <CardTitle className="text-xl">Select your dream jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>Handpick & delegate your favorites in a single click.</p>
            <div className="grid gap-2 text-sm">
              <div className="rounded-xl border bg-background p-3 flex items-center justify-between">
                <div className="flex items-center gap-2"><Layers className="h-4 w-4"/> Product Manager</div>
                <Badge variant="outline">$160k–200k</Badge>
              </div>
              <div className="rounded-xl border bg-background p-3 flex items-center justify-between">
                <div className="flex items-center gap-2"><Layers className="h-4 w-4"/> Software Engineer</div>
                <Badge variant="outline">$130k–180k</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="relative overflow-hidden bg-emerald-50">
          <div className="pointer-events-none absolute -right-14 -bottom-12 h-48 w-48 rounded-full bg-emerald-200/60 blur-2xl" />
          <CardHeader className="pb-3">
            <Badge variant="secondary" className="rounded-full w-fit">3</Badge>
            <CardTitle className="text-xl">We apply for you</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Your dedicated assistant applies within 12–24 hours—guaranteed.</p>
            <div className="rounded-xl border bg-background p-3 space-y-2 text-sm">
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><FileText className="h-4 w-4"/> Software Engineer (SWE)</div><Badge className="rounded-full">Applied</Badge></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><FileText className="h-4 w-4"/> Product Manager</div><Badge className="rounded-full">Applied</Badge></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><FileText className="h-4 w-4"/> Management Consultant</div><Badge className="rounded-full">Applied</Badge></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-emerald-100 px-2 py-1">Delegated (3)</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1">Applied (16)</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1">Interviews (2)</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function PricingPage(){
  const tiers = [
    { name:"Lite", price:"$149", desc:"30 applications / month", perks:["Tailored resume + CL","Assistant submission","Dashboard tracking"] },
    { name:"Pro", price:"$399", desc:"100 applications / month", perks:["Priority queue","ATS coverage report","Email notifications"] },
    { name:"Premium", price:"$899", desc:"Unlimited applications", perks:["Dedicated assistant","Weekly strategy call","24h turnaround"] },
  ];
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Pricing</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <Card key={t.name} className="relative">
            <CardHeader>
              <CardTitle>{t.name}</CardTitle>
              <div className="text-3xl font-bold">{t.price}<span className="text-base font-normal text-muted-foreground">/mo</span></div>
              <div className="text-muted-foreground">{t.desc}</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {t.perks.map(p=>(<li key={p} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/>{p}</li>))}
              </ul>
              <Button className="w-full mt-4">Choose {t.name}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FAQPage(){
  const qs = [
    {q:"How do you apply on my behalf?", a:"We generate tailored docs and a human assistant submits on your selected portals, then updates status in your dashboard."},
    {q:"Is my resume format preserved?", a:"Yes. We lock your LaTeX/Docx template and only edit content fields (skills & bullets)."},
    {q:"Do you use bots?", a:"No. We are human-in-the-loop for submissions to keep you compliant and effective."},
  ];
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-3xl font-bold">FAQ</h2>
      {qs.map((x,i)=> (
        <Card key={i}>
          <CardHeader><CardTitle className="text-lg">{x.q}</CardTitle></CardHeader>
          <CardContent className="text-muted-foreground">{x.a}</CardContent>
        </Card>
      ))}
    </div>
  );
}

function ToolsPage(){
  const tools = [
    {name:"Resume ATS Score Checker", desc:"Quick overlap score vs JD", icon:Layers},
    {name:"AI Cover Letter Generator", desc:"Professional tone, JD-mirroring", icon:FileText},
    {name:"Job Application Tracker", desc:"Spreadsheet-style tracker", icon:ClipboardList},
  ];
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Free Tools</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {tools.map((t)=> (
          <Card key={t.name}>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><t.icon className="h-4 w-4"/>{t.name}</CardTitle></CardHeader>
            <CardContent className="text-muted-foreground">{t.desc}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ResourcesPage(){
  const links = [
    "LinkedIn Profile Optimization Guide",
    "System Design Interview Handbook",
    "Data Science Interview Handbook",
    "Top 100 H1B Sponsoring Companies",
    "Comprehensive Job Search Guide",
  ];
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Resource Library</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {links.map(l => (
          <Card key={l}>
            <CardHeader><CardTitle className="text-base">{l}</CardTitle></CardHeader>
            <CardContent className="text-muted-foreground">Curated guidance to accelerate your search.</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------------- User App ----------------
function JobsTable({ rows, onStar, onDelete, onOpen }:{ rows:JobRow[]; onStar:(id:string)=>void; onDelete:(id:string)=>void; onOpen:(id:string)=>void }){
  return (
    <div className="w-full overflow-auto rounded-2xl border shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr className="text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Company</th>
            <th className="p-3 whitespace-nowrap">Delegated On</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r)=> (
            <tr key={r.id} className="border-t hover:bg-muted/40">
              <td className="p-3 font-mono text-xs text-muted-foreground">{r.id}</td>
              <td className="p-3 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">{r.title.slice(0,1)}</span>
                <button className="hover:underline" onClick={()=>onOpen(r.id)}>{r.title}</button>
              </td>
              <td className="p-3 flex items-center gap-2"><Building2 className="h-4 w-4"/>{r.company}</td>
              <td className="p-3">{r.delegatedOn ? new Date(r.delegatedOn).toLocaleDateString() : "—"}</td>
              <td className="p-3">{statusBadge(r.status)}</td>
              <td className="p-3">
                <div className="flex items-center justify-end gap-2">
                  <Button variant={r.starred?"default":"outline"} size="icon" onClick={()=>onStar(r.id)}><Star className={`h-4 w-4 ${r.starred?"fill-current":""}`}/></Button>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                  <Button variant="destructive" size="icon" onClick={()=>onDelete(r.id)}><Trash2 className="h-4 w-4"/></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserShell({ page, setPage }:{ page:string; setPage:(p:string)=>void }){
  const Item = ({to, label}:{to:string; label:string}) => (
    <button onClick={()=>setPage(to)} className={`flex w-full items-center justify-between px-3 py-2 rounded-lg hover:bg-muted ${page===to?"text-primary":""}`}>
      <span>{label}</span>
      <ChevronRight className="h-4 w-4"/>
    </button>
  );
  return (
    <aside className="col-span-3 xl:col-span-2">
      <Card className="sticky top-4">
        <CardHeader><CardTitle className="text-lg">Menu</CardTitle></CardHeader>
        <CardContent className="space-y-1">
          <Item to="user.app" label="Dashboard"/>
          <Item to="user.submit" label="Submit Job"/>
          <Item to="user.apps" label="Applications"/>
          <Item to="user.resume" label="Resume"/>
          <Item to="user.profile" label="Profile"/>
          <div className="pt-2 text-sm text-muted-foreground">Add to Chrome (extension)</div>
        </CardContent>
      </Card>
    </aside>
  );
}

function UserDashboard({ openApp }:{ openApp:(id:string)=>void }){
  const [jobs, setJobs] = useState<JobRow[]>(MOCK_JOBS);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Status|"all">("delegated");
  const [newUrl, setNewUrl] = useState("");
  const creditsLeft = 89;
  const filtered = useMemo(()=>{
    const q = query.toLowerCase();
    return jobs.filter(j => [j.id, j.title, j.company].some(f => f.toLowerCase().includes(q)));
  },[jobs, query]);
  const visible = useMemo(()=> tab==="all"? filtered : filtered.filter(j=>j.status===tab), [filtered, tab]);
  const onStar = (id:string)=> setJobs(p=> p.map(j=> j.id===id?{...j, starred:!j.starred}:j));
  const onDelete = (id:string)=> setJobs(p=> p.filter(j=> j.id!==id));
  const addJob = async ()=>{ if(!newUrl) return; const created=await apiAddJob(newUrl); setJobs(p=>[created,...p]); setNewUrl(""); };
  return (
    <section className="col-span-9 xl:col-span-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Jobs</h1>
          <p className="text-sm text-muted-foreground">Manage and track your delegated applications</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="rounded-full px-3 py-1 text-sm">{creditsLeft} Credits left</Badge>
          <div className="flex items-center gap-2">
            <Input value={newUrl} onChange={e=>setNewUrl(e.target.value)} placeholder="Paste job URL" className="w-64"/>
            <Button onClick={addJob}><Plus className="mr-2 h-4 w-4"/>Add Job</Button>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
              <Input placeholder="Search jobs…" value={query} onChange={e=>setQuery(e.target.value)} className="pl-8 w-80"/>
            </div>
            <div className="flex items-center gap-2"><span className="text-sm text-muted-foreground">Show my starred</span><Switch/></div>
          </div>
          <Tabs value={tab} onValueChange={(v)=>setTab(v as any)}>
            <TabsList className="mb-4">
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="delegated">Delegated</TabsTrigger>
              <TabsTrigger value="applied">Applied</TabsTrigger>
              <TabsTrigger value="interview">Interview</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            <TabsContent value={tab} className="mt-0">
              <JobsTable rows={visible} onStar={onStar} onDelete={onDelete} onOpen={openApp} />
            </TabsContent>
          </Tabs>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground"><span>Rows per page 50</span><span>Page 1 of 1</span></div>
        </CardContent>
      </Card>
    </section>
  );
}

function SubmitJobPage(){
  const [url, setUrl] = useState("");
  return (
    <section className="col-span-9 xl:col-span-10 space-y-6">
      <h2 className="text-2xl font-semibold">Submit Job</h2>
      <Card>
        <CardContent className="pt-6 space-y-3">
          <Input placeholder="Paste job URL" value={url} onChange={e=>setUrl(e.target.value)} />
          <Button><Plus className="mr-2 h-4 w-4"/>Create Application</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Or paste JD text</CardTitle></CardHeader>
        <CardContent>
          <textarea className="w-full min-h-[200px] rounded-lg border p-3" placeholder="Paste job description…" />
          <div className="mt-3 text-right"><Button>Submit</Button></div>
        </CardContent>
      </Card>
    </section>
  );
}

function ApplicationsList({ openApp }:{ openApp:(id:string)=>void }){
  const [jobs, setJobs] = useState<JobRow[]>(MOCK_JOBS);
  return (
    <section className="col-span-9 xl:col-span-10 space-y-6">
      <h2 className="text-2xl font-semibold">Applications</h2>
      <Card>
        <CardContent className="pt-6">
          <JobsTable rows={jobs} onStar={(id)=>setJobs(p=>p.map(j=>j.id===id?{...j,starred:!j.starred}:j))} onDelete={(id)=>setJobs(p=>p.filter(j=>j.id!==id))} onOpen={openApp}/>
        </CardContent>
      </Card>
    </section>
  );
}

function ApplicationDetail({ id, goBack }:{ id:string; goBack:()=>void }){
  return (
    <section className="col-span-9 xl:col-span-10 space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={goBack}><ArrowLeft className="h-4 w-4"/> Back</Button>
        <h2 className="text-xl font-semibold">Application {id}</h2>
      </div>
      <Tabs defaultValue="job">
        <TabsList className="mb-4">
          <TabsTrigger value="job">Job</TabsTrigger>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="job">
          <Card><CardContent className="pt-6 text-sm text-muted-foreground">(Mock JD) We’re seeking a Data Scientist to build ML pipelines, collaborate with stakeholders, and drive insights using Python, SQL, and cloud tooling.</CardContent></Card>
        </TabsContent>
        <TabsContent value="docs">
          <Card><CardContent className="pt-6 space-y-3">
            <div className="flex items-center justify-between"><div>Tailored Resume.pdf</div><Button variant="outline">Download</Button></div>
            <div><div className="font-medium mb-1">Cover Letter</div><div className="rounded-lg border p-3 text-sm">Dear Hiring Manager, …</div></div>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="timeline">
          <Card><CardContent className="pt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4"/> 09:15 – Scraped JD</div>
            <div className="flex items-center gap-2 text-muted-foreground"><FileText className="h-4 w-4"/> 09:18 – Tailored docs ready</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4"/> 10:02 – Assistant applied</div>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function ResumePage(){
  return (
    <section className="col-span-9 xl:col-span-10 space-y-6">
      <h2 className="text-2xl font-semibold">Resume</h2>
      <Card><CardContent className="pt-6 space-y-3">
        <div className="text-sm text-muted-foreground">Accepted formats: .tex, .docx, .pdf</div>
        <div className="flex gap-2"><Input type="file"/><Button>Upload</Button></div>
        <div className="rounded-lg border p-3 text-sm">Active resume: <strong>resume.tex</strong> <Badge variant="outline" className="ml-2">Active</Badge></div>
      </CardContent></Card>
    </section>
  );
}

function ProfilePage(){
  return (
    <section className="col-span-9 xl:col-span-10 space-y-6">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <Card><CardContent className="pt-6 grid md:grid-cols-2 gap-4">
        <Input placeholder="Full Name" defaultValue="Pranav Sai Ganta"/>
        <Input placeholder="Email" defaultValue="pranav@example.com"/>
        <Input placeholder="Phone"/>
        <Input placeholder="Location"/>
        <Input placeholder="LinkedIn URL"/>
        <div className="md:col-span-2 text-right"><Button>Save</Button></div>
      </CardContent></Card>
    </section>
  );
}

// ---------------- Assistant Console ----------------
function AssistantQueue({ openApp }:{ openApp:(id:string)=>void }){
  const [jobs, setJobs] = useState<JobRow[]>(MOCK_JOBS.filter(j=>["delegated","on_hold"].includes(j.status)));
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Assistant Queue</h2>
        <div className="flex items-center gap-2"><Input placeholder="Search…" className="w-64"/><Button variant="outline">Claim Next</Button></div>
      </div>
      <Card><CardContent className="pt-6">
        <JobsTable rows={jobs} onStar={()=>{}} onDelete={(id)=>setJobs(p=>p.filter(j=>j.id!==id))} onOpen={openApp}/>
      </CardContent></Card>
    </section>
  );
}

// ---------------- Root App with Nav ----------------
export default function App(){
  const [route, setRoute] = useState<string>("home");
  const [openId, setOpenId] = useState<string|undefined>();

  const isUser = route.startsWith("user");
  const isAssistant = route.startsWith("assistant");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {(route==="home"||route==="pricing"||route==="faq"||route==="tools"||route==="resources") && <PublicShell page={route} setPage={setRoute} />}
      <main className="max-w-6xl mx-auto p-6">
        {/* PUBLIC PAGES */}
        {route==="home" && <HomePage setPage={setRoute}/>} 
        {route==="pricing" && <PricingPage/>}
        {route==="faq" && <FAQPage/>}
        {route==="tools" && <ToolsPage/>}
        {route==="resources" && <ResourcesPage/>}

        {/* USER APP */}
        {isUser && (
          <div className="grid grid-cols-12 gap-6">
            <UserShell page={route} setPage={setRoute}/>
            {route==="user.app" && <UserDashboard openApp={(id)=>{ setOpenId(id); setRoute("user.app.detail"); }}/>}
            {route==="user.submit" && <SubmitJobPage/>}
            {route==="user.apps" && <ApplicationsList openApp={(id)=>{ setOpenId(id); setRoute("user.apps.detail"); }}/>}
            {route==="user.apps.detail" && openId && <ApplicationDetail id={openId} goBack={()=>setRoute("user.apps")}/>}
            {route==="user.app.detail" && openId && <ApplicationDetail id={openId} goBack={()=>setRoute("user.app")}/>}
            {route==="user.resume" && <ResumePage/>}
            {route==="user.profile" && <ProfilePage/>}
          </div>
        )}

        {/* ASSISTANT */}
        {isAssistant && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Users className="h-5 w-5"/><h1 className="text-2xl font-semibold">Assistant Console</h1></div>
              <div className="flex items-center gap-2"><Button variant="outline" onClick={()=>setRoute("home")}>Public</Button><Button onClick={()=>setRoute("user.app")} variant="default">User App</Button></div>
            </div>
            {route==="assistant.queue" && <AssistantQueue openApp={(id)=>{ setOpenId(id); setRoute("assistant.detail"); }}/>}
            {route==="assistant.detail" && openId && (
              <div className="grid grid-cols-12 gap-6">
                <aside className="col-span-3 xl:col-span-2"><Card><CardHeader><CardTitle>Candidate</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground space-y-1">
                  <div>Name: Jane Doe</div><div>Email: jane@demo.com</div><div>Phone: (555) 555-5555</div><div>LinkedIn: linkedin.com/in/jane</div></CardContent></Card></aside>
                <section className="col-span-9 xl:col-span-10"><ApplicationDetail id={openId} goBack={()=>setRoute("assistant.queue")}/></section>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} ApplyFlow — Human-in-the-loop job applications</footer>
    </div>
  );
}
