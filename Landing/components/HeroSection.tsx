import CTAButton from "./ui/CTAButton";
import { SITE } from "@/data/site";
import { PRICING } from "@/data/pricing";

export default function HeroSection() {
  const lowest = PRICING.reduce(
    (min, p) => {
      const n = parseInt(p.price.replace(/[^0-9]/g, ""), 10);
      return n < min.n ? { n, label: p.price, name: p.name } : min;
    },
    { n: Number.POSITIVE_INFINITY, label: "", name: "" }
  );

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-ink pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28"
    >
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[480px]"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, rgba(56,189,248,0.28), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[12.5px] sm:text-[13px] font-semibold text-white/85 backdrop-blur">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[var(--accent-cyan)] opacity-70 blur-[3px]" />
              <span className="relative h-2 w-2 rounded-full bg-[var(--accent-cyan)]" />
            </span>
            {SITE.hero.badge}
          </span>

          <h1 className="mt-6 text-[36px] sm:text-[52px] md:text-[68px] font-black leading-[1.08] tracking-[-0.02em] text-white whitespace-pre-line">
            홈페이지 제작,{"\n"}
            <span className="text-gradient">얼마인지 먼저</span> 알려드립니다.
          </h1>

          <p className="mt-6 max-w-2xl text-[16px] sm:text-[18px] leading-[1.65] text-white/75">
            {SITE.hero.sub}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:items-center">
            <CTAButton href="#contact" variant="primary" size="lg" className="w-full sm:w-auto">
              {SITE.cta.primary}
              <ArrowRight />
            </CTAButton>
            <CTAButton href="#pricing" variant="secondary-dark" size="lg" className="w-full sm:w-auto">
              {SITE.cta.secondary}
            </CTAButton>
          </div>

          {lowest.n !== Number.POSITIVE_INFINITY && (
            <div className="mt-8 inline-flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur">
              <span className="rounded-md bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent)] px-2 py-0.5 text-[11px] font-black tracking-wider text-white">
                FROM
              </span>
              <span className="text-sm text-white/85">
                {lowest.name}{" "}
                <span className="font-black text-white">{lowest.label}</span>
                <span className="text-white/55"> · 부가세 별도</span>
              </span>
            </div>
          )}

          <div className="mt-10 grid grid-cols-3 max-w-md gap-6 text-white/70 text-[12.5px]">
            <HeroStat label="누적 제작" value="120건+" />
            <HeroStat label="평균 기간" value="2주" />
            <HeroStat label="만족도" value="4.8/5" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[18px] sm:text-[20px] font-extrabold tracking-tight text-white">
        {value}
      </p>
      <p className="mt-0.5 text-[11.5px] tracking-wider text-white/55 uppercase">
        {label}
      </p>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d="M10.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
