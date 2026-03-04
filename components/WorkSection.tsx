const projects = [
  {
    year: "2024",
    title: "Payments Platform Rebuild",
    role: "Lead Engineer",
    description:
      "Re-architected a monolith processing $2M/day into an event-driven microservices system. Reduced p99 latency by 60%.",
    tags: ["TypeScript", "Node.js", "Kafka", "PostgreSQL"],
  },
  {
    year: "2023",
    title: "Developer Analytics SaaS",
    role: "Founding Engineer",
    description:
      "Built a B2B SaaS from scratch to $200k ARR. Designed the data pipeline, dashboard UI, and billing integration.",
    tags: ["Next.js", "Python", "Stripe", "Clickhouse"],
  },
  {
    year: "2022",
    title: "Open-Source Component Library",
    role: "Creator & Maintainer",
    description:
      "Shipped a design-system library for React. 2k+ GitHub stars, used by 300+ projects.",
    tags: ["React", "TypeScript", "Storybook"],
  },
];

export default function WorkSection() {
  return (
    <section className="py-24 px-6 border-t border-ink/10 bg-ink/[0.02]">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs tracking-widest text-muted uppercase mb-12">
          Selected work
        </p>

        <div className="space-y-0 divide-y divide-ink/10">
          {projects.map((p) => (
            <div
              key={p.title}
              className="py-10 grid md:grid-cols-[120px_1fr] gap-4 md:gap-10 group"
            >
              <div className="font-mono text-xs text-muted pt-1">{p.year}</div>
              <div>
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <h3 className="font-display text-xl text-ink">{p.title}</h3>
                  <span className="font-mono text-xs text-muted">{p.role}</span>
                </div>
                <p className="text-muted leading-relaxed mb-4">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2.5 py-0.5 border border-ink/10 text-ink/50 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
