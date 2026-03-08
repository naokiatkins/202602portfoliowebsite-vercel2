import Link from "next/link";
import { certifications } from "@/lib/certifications";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications — Your Name",
  description: "Professional certifications and credentials.",
};

export default function CertificationsPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="px-6 py-6 flex items-center justify-between border-b border-ink/10">
        <Link
          href="/"
          className="font-mono text-xs text-muted hover:text-ink transition-colors"
        >
          ← Back
        </Link>
        <span className="font-mono text-xs tracking-widest text-muted uppercase">
          Certifications
        </span>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div
          className="animate-fade-up mb-16"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          <p className="font-mono text-xs tracking-widest text-muted uppercase mb-4">
            Credentials
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight">
            Certifications
          </h1>
        </div>

        <div className="grid gap-px bg-ink/10">
          {certifications.map((cert, i) => (
            <Link
              key={cert.id}
              href={`/certifications/${cert.id}`}
              className="group bg-cream hover:bg-ink/[0.02] transition-colors duration-200 p-8 flex items-center gap-8 animate-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.07}s`, opacity: 0 }}
            >
              {/* Logo placeholder */}
              <div
                className="w-14 h-14 rounded-sm flex items-center justify-center flex-shrink-0 font-mono text-xs font-medium text-white"
                style={{ backgroundColor: cert.color }}
              >
                {cert.initials}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <h2 className="font-display text-xl text-ink group-hover:text-rust transition-colors">
                    {cert.name}
                  </h2>
                  <span className="font-mono text-xs text-muted">
                    {cert.issuer}
                  </span>
                </div>
                <p className="font-mono text-xs text-muted">{cert.year}</p>
              </div>

              {/* Arrow */}
              <span className="font-mono text-muted group-hover:text-ink group-hover:translate-x-1 transition-all duration-200 flex-shrink-0">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-ink/10 py-8 px-6 text-center">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Your Name
        </p>
      </footer>
    </main>
  );
}
