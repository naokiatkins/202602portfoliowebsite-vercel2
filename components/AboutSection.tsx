export default function AboutSection() {
  const stats = [
    { value: "5", label: "Years exp." },
    { value: "3", label: "Products shipped 0→1" },
    { value: "2k+", label: "GitHub stars" },
    { value: "12", label: "Countries worked across" },
  ];

  return (
    <section className="py-24 px-6 border-t border-ink/10">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <p className="font-mono text-xs tracking-widest text-muted uppercase mb-6">
            About
          </p>
          <p className="font-display text-2xl md:text-3xl text-ink leading-snug mb-6">
            I build products people actually want to use.
          </p>
          <p className="text-muted leading-relaxed mb-4">
            Six years in, I&apos;ve worked across early-stage startups and
            scale-ups — owning full product surfaces from design to deployment.
          </p>
          <p className="text-muted leading-relaxed">
            My stack centres on TypeScript, React and Node.js. I care equally
            about code quality and the humans who use what I ship.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 content-start">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl text-ink mb-1">{s.value}</p>
              <p className="font-mono text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
