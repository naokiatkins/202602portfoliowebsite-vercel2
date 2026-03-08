"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Work" },
  { href: "/certifications", label: "Certifications" },
  { href: "/#book", label: "Book a call" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between border-b border-ink/10 bg-cream/90 backdrop-blur-sm">
      <Link href="/" className="font-display text-lg text-ink">
        Your Name
      </Link>

      <nav className="flex items-center gap-8">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${
              pathname === l.href ? "text-ink" : "text-muted hover:text-ink"
            } ${l.label === "Book a call" ? "border border-ink/30 px-4 py-2 hover:border-ink" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
