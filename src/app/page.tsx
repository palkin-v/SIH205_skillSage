
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        {/* Background ambiance: gradient + subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-primary/5 to-transparent" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--tw-shadow) 1px, transparent 1px), linear-gradient(to bottom, var(--tw-shadow) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.02)",
            // Using CSS var fallback to currentColor-like tint
            // Tailwind can't easily express this inline; it's purely decorative.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            "--tw-shadow": "rgba(125,125,125,0.25)",
          }}
        />
        {/* Parallax blobs */}
        <div className="pointer-events-none absolute left-1/2 top-[-10rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-24 hidden h-64 w-64 rotate-12 rounded-full bg-gradient-to-tr from-primary/30 to-transparent blur-2xl md:block" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden text-lg font-semibold sm:inline">SkillSage</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="/auth" className="inline-flex h-9 items-center rounded-md border border-input bg-background px-3 text-sm font-medium transition [text-shadow:0_0_0_rgba(0,0,0,0)] hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground">Sign in</a>
            <a href="/auth" className="relative inline-flex h-9 items-center overflow-hidden rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition hover:-translate-y-0.5 hover:bg-primary/90">
              <span className="relative z-10">Get started</span>
              <span className="absolute inset-0 -translate-y-full bg-gradient-to-b from-white/20 to-transparent opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" />
            </a>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-12 pt-8 sm:px-6 md:grid-cols-2 md:gap-10 md:pb-16 md:pt-16">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_10px_theme(colors.green.500)]" /> AI-guided vocational pathways
            </div>
            <h1 className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
              Chart your path with confidence
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Tailored learning plans, job-aligned skills, and real-time insights—everything you need to move forward faster.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a href="/auth" className="group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow transition hover:-translate-y-0.5 hover:bg-primary/90">
                <span className="relative z-10">Start free</span>
                <span className="relative z-10 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              </a>
              <a href="#features" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground">
                Explore features
              </a>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2 text-center text-sm">
              <div className="rounded-md border bg-card p-3 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="font-semibold">10k+</div>
                <div className="text-muted-foreground text-xs">Resources</div>
              </div>
              <div className="rounded-md border bg-card p-3 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="font-semibold">500+</div>
                <div className="text-muted-foreground text-xs">Skills mapped</div>
              </div>
              <div className="rounded-md border bg-card p-3 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="font-semibold">4.9/5</div>
                <div className="text-muted-foreground text-xs">User rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-primary/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl transition hover:shadow-2xl">
              <div className="border-b bg-muted/40 px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  <span className="ml-2 font-medium">SkillSage Preview</span>
                </div>
              </div>
              <div className="grid gap-4 p-4 md:grid-cols-5">
                <div className="md:col-span-3">
                  <div className="group rounded-lg border bg-background p-3">
                    <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Weekly Progress</span>
                      <span>Last 7 days</span>
                    </div>
                    <div className="relative h-40 w-full overflow-hidden rounded-md bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent">
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/30 to-transparent" />
                      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_40%),_radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.18),transparent_35%)] transition group-hover:scale-105" />
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="rounded-md border p-2 transition hover:shadow-sm">
                        <div className="font-semibold">+12%</div>
                        <div className="text-muted-foreground">Completion</div>
                      </div>
                      <div className="rounded-md border p-2 transition hover:shadow-sm">
                        <div className="font-semibold">6h</div>
                        <div className="text-muted-foreground">Study time</div>
                      </div>
                      <div className="rounded-md border p-2 transition hover:shadow-sm">
                        <div className="font-semibold">3</div>
                        <div className="text-muted-foreground">Milestones</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="rounded-lg border bg-background p-3">
                    <div className="mb-2 text-xs text-muted-foreground">Next up</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between rounded-md border p-2 transition hover:-translate-y-0.5 hover:bg-accent/40">
                        <span>Finish React module</span>
                        <span className="rounded bg-primary/10 px-2 py-0.5 text-primary">Due</span>
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-2 transition hover:-translate-y-0.5 hover:bg-accent/40">
                        <span>Mock interview</span>
                        <span className="rounded bg-emerald-100 px-2 py-0.5 text-emerald-700">Scheduled</span>
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-2 transition hover:-translate-y-0.5 hover:bg-accent/40">
                        <span>Portfolio update</span>
                        <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-700">Pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 rounded-lg border bg-background p-3">
                    <div className="mb-1 text-xs text-muted-foreground">Highlights</div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border px-2 py-1 transition hover:bg-primary/10 hover:text-primary">AI Pathways</span>
                      <span className="rounded-full border px-2 py-1 transition hover:bg-primary/10 hover:text-primary">Job Insights</span>
                      <span className="rounded-full border px-2 py-1 transition hover:bg-primary/10 hover:text-primary">Skill Graph</span>
                      <span className="rounded-full border px-2 py-1 transition hover:bg-primary/10 hover:text-primary">Progress</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow accents */}
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-xl" />
              <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary/20 blur-xl" />
            </div>

            {/* Side aura */}
            <div className="pointer-events-none absolute -right-8 top-1/2 hidden h-24 w-24 -translate-y-1/2 rotate-6 rounded-full bg-gradient-to-tr from-primary/30 to-transparent blur-2xl md:block" />
          </div>
        </div>
      </section>

      <section id="features" className="border-t bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-sm font-medium text-primary">Smart Pathways</div>
              <h3 className="mt-1 text-lg font-semibold">Personalized learning plans</h3>
              <p className="text-muted-foreground mt-1 text-sm">We analyze your profile and goals to build clear, step-by-step journeys.</p>
            </div>
            <div className="rounded-xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-sm font-medium text-primary">Real-time Insights</div>
              <h3 className="mt-1 text-lg font-semibold">Track progress effortlessly</h3>
              <p className="text-muted-foreground mt-1 text-sm">Visualize growth and adapt with actionable analytics and guidance.</p>
            </div>
            <div className="rounded-xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-sm font-medium text-primary">Career-aligned</div>
              <h3 className="mt-1 text-lg font-semibold">Skills employers need</h3>
              <p className="text-muted-foreground mt-1 text-sm">Curated resources mapped to in-demand roles and certifications.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-8 text-sm text-muted-foreground sm:px-6">
          <div className="flex items-center gap-2">
            <Logo />
            <span>© {new Date().getFullYear()} SkillSage</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/auth" className="hover:text-foreground">Sign in</a>
            <a href="#features" className="hover:text-foreground">Features</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
