import SectionTitle from "./ui/SectionTitle";
import { PORTFOLIO, CAREER } from "@/data/portfolio";

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative overflow-hidden bg-ink py-24 sm:py-28 md:py-32">
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="orb orb-2 -z-10" style={{ width: 480, height: 480, top: -200, left: -120 }} aria-hidden="true" />
      <div className="orb orb-1 -z-10" style={{ width: 460, height: 460, top: 100, right: -180, opacity: 0.4 }} aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="WORK"
          tone="dark"
          title="다양한 업종의 제작 경험"
          description="병원·학원·식당·공방·스타트업 등 소상공인 업종 중심으로 제작하고 있습니다."
        />

        <dl className="mt-14 grid gap-4 sm:gap-5 grid-cols-2 lg:grid-cols-4">
          {CAREER.map((c) => (
            <div
              key={c.label}
              className="card-hover-dark relative overflow-hidden rounded-2xl glass p-5 sm:p-6"
            >
              <dt className="text-eyebrow text-white/55">{c.label}</dt>
              <dd className="mt-2 text-[clamp(1.875rem,1.3rem+2.2vw,2.5rem)] font-black tracking-tight">
                <span className="text-gradient">{c.value}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 sm:mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((p) => (
            <article
              key={p.title}
              className="card-hover-dark group relative rounded-2xl glass p-6 sm:p-7"
            >
              <span className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[12px] font-bold text-white/85">
                {p.category}
              </span>
              <h3 className="mt-4 text-[17px] sm:text-[19px] font-extrabold tracking-tight text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-[14.5px] sm:text-[15.5px] text-white/70 leading-relaxed">
                {p.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
