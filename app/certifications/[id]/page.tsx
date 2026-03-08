import Link from "next/link";
import { certifications } from "@/lib/certifications";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return certifications.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cert = certifications.find((c) => c.id === params.id);
  if (!cert) return {};
  return {
    title: `${cert.name} — Your Name`,
    description: cert.description,
  };
}

export default function CertificationDetailPage({ params }: Props) {
  const cert = certifications.find((c) => c.id === params.id);
  if (!cert) notFound();

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="px-6 py-6 flex items-center justify-between border-b border-ink/10">
        <Link
          href="/certifications"
          className="font-mono text-xs text-muted hover:text-ink transition-colors"
        >
          ← All certifications
        </Link>
        <span className="font-mono text-xs tracking-widest text-muted uppercase">
          {cert.issuer}
        </span>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-20">
        {/* Logo + title */}
        <div
          className="animate-fade-up mb-12"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          <div
            className="w-20 h-20 rounded-sm flex items-center justify-center font-mono text-sm font-medium text-white mb-8"
            style={{ backgroundColor: cert.color }}
          >
            {cert.initials}
          </div>

          <p className="font-mono text-xs tracking-widest text-muted uppercase mb-3">
            {cert.issuer} · {cert.year}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6">
            {cert.name}
          </h1>
          <p className="text-muted leading-relaxed text-lg">
            {cert.description}
          </p>
        </div>

        {/* Skills */}
        <div
          className="animate-fade-up mb-12"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <p className="font-mono text-xs tracking-widest text-muted uppercase mb-4">
            Topics covered
          </p>
          <div className="flex flex-wrap gap-2">
            {cert.skills.map((s) => (
              <span
                key={s}
                className="font-mono text-xs px-3 py-1.5 border border-ink/15 rounded-full text-ink/70"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-ink/10 my-10" />

        {/* Actions */}
        <div
          className="animate-fade-up flex flex-col sm:flex-row gap-4"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          <a
            href={cert.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm border border-ink px-6 py-3 text-center hover:bg-ink hover:text-cream transition-colors duration-200"
          >
            Verify credential →
          </a>
          <Link
            href="/certifications"
            className="font-mono text-sm border border-ink/20 px-6 py-3 text-center text-muted hover:border-ink hover:text-ink transition-colors duration-200"
          >
            View all certifications
          </Link>
        </div>
      </div>

      <footer className="border-t border-ink/10 py-8 px-6 text-center mt-20">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Your Name
        </p>
      </footer>
    </main>
  );
}
