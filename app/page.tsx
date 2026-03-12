"use client";

import { useState, useCallback } from "react";
import { Analytics } from "@vercel/analytics/next";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import JDGate from "@/components/JDGate";

export default function Home() {
  const [matchResult, setMatchResult] = useState<{
    score: number;
    summary: string;
    skills: string[];
    gaps: string[];
  } | null>(null);

  const threshold = Number(
    process.env.NEXT_PUBLIC_MATCH_THRESHOLD ?? 70
  );

  const isHighMatch = matchResult !== null && matchResult.score >= threshold;

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <WorkSection />

      {/* ── The gate ── */}
      <section id="book" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-widest text-muted uppercase mb-4">
            Work with me
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-6 leading-tight">
            Are we a fit?
          </h2>
          <p className="text-muted leading-relaxed mb-12 max-w-lg">
            Upload your job description. I&apos;ll analyse it against my
            background and — if there&apos;s a strong match — unlock my
            calendar so we can talk.
          </p>

          <JDGate onResult={setMatchResult} result={matchResult} />

          {isHighMatch && (
            <CalendarEmbed />
          )}

          {matchResult && !isHighMatch && (
            <LowMatchMessage score={matchResult.score} threshold={threshold} />
          )}
        </div>
      </section>

      <footer className="border-t border-ink/10 py-8 px-6 text-center">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Your Name
        </p>
      </footer>
    </main>
  );
}

function CalendarEmbed() {
  const calUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL;

  if (!calUrl) {
    return (
      <div className="mt-10 p-6 border border-ink/10 rounded text-center text-muted font-mono text-sm">
        Set <code>NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL</code> in your{" "}
        <code>.env.local</code> to show the calendar.
      </div>
    );
  }

  return (
    <div className="mt-10 animate-fade-up">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
        <p className="font-mono text-xs tracking-widest text-rust uppercase">
          Great match — book a call
        </p>
      </div>
      <iframe
        src={calUrl}
        className="calendar-frame w-full"
        height="600"
        title="Book a call"
        allowFullScreen
      />
    </div>
  );
}

function LowMatchMessage({
  score,
  threshold,
}: {
  score: number;
  threshold: number;
}) {
  return (
    <div className="mt-8 p-6 border border-ink/10 rounded-sm animate-fade-up">
      <p className="font-mono text-xs tracking-widest text-muted uppercase mb-2">
        Match score: {score}/100
      </p>
      <p className="text-ink/70 leading-relaxed">
        This role looks like a {score}% match — my calendar unlocks at{" "}
        {threshold}%. That said, feel free to reach out via the links above if
        you think the fit is there.
      </p>
    </div>
  );
}
