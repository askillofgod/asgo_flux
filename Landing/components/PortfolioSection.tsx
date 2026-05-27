import SectionTitle from "./ui/SectionTitle";
import { PORTFOLIO, CAREER } from "@/data/portfolio";

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative overflow-hidden bg-ink py-20 sm:py-24 md:py-28">
      <div className="bg-grid absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, rgba(56,189,248,0.18), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="WORK"
          tone="dark"
          title="다양한 업종의 제작 경험"
          description="병원·학원·식당·공방·스타트업 등 소상공인 업종 중심으로 제작하고 있습니다."
        />

        <div className="mt-12 grid gap-4 sm:gap-5 grid-cols-2 lg:grid-cols-4">
          {CAREER.map((c) => (
            <div
              key={c.label}
              className="card-hover-dark relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur"
            >
              <p className="text-[11.5px] tracking-[0.18em] font-semibold text-white/50 uppercase">
                {c.label}
              </p>
              <p className="mt-2 text-[28px] sm:text-[34px] font-black tracking-tight">
                <span className="text-gradient">{c.value}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((p) => (
            <article
              key={p.title}
              className="card-hover-dark group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur"
            >
              <span className="inline-block rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11.5px] font-semibold text-white/75">
                {p.category}
              </span>
              <h3 className="mt-3 text-[15.5px] sm:text-[17px] font-bold text-white">
                {p.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] sm:text-[14.5px] text-white/65 leading-relaxed">
                {p.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
