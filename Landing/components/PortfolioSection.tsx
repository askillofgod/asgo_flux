import SectionTitle from "./ui/SectionTitle";
import { PORTFOLIO, CAREER } from "@/data/portfolio";

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-[var(--bg-soft)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="WORK"
          title="다양한 업종의 제작 경험"
          description="병원·학원·식당·공방·스타트업 등 소상공인 업종 중심으로 제작하고 있습니다."
        />

        <div className="mt-8 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4">
          {CAREER.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-[var(--border)] bg-white p-4 sm:p-5 text-center"
            >
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">{c.label}</p>
              <p className="mt-1 text-xl sm:text-2xl font-black text-[var(--primary)]">
                {c.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-6"
            >
              <span className="inline-block rounded-full bg-[var(--bg-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--primary)]">
                {p.category}
              </span>
              <h3 className="mt-3 text-base sm:text-lg font-bold text-[var(--primary)]">
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--text-muted)] leading-relaxed">
                {p.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
