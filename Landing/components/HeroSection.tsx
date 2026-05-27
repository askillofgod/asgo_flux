import CTAButton from "./ui/CTAButton";
import { SITE } from "@/data/site";
import { PRICING } from "@/data/pricing";

export default function HeroSection() {
  const lowest = PRICING.reduce((min, p) => {
    const n = parseInt(p.price.replace(/[^0-9]/g, ""), 10);
    return n < min.n ? { n, label: p.price, name: p.name } : min;
  }, { n: Number.POSITIVE_INFINITY, label: "", name: "" });

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[var(--primary)] pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, #2563eb 0%, transparent 45%), radial-gradient(circle at 85% 30%, #3b82f6 0%, transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs sm:text-[13px] font-semibold text-white/90 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[var(--kakao)]" />
            {SITE.hero.badge}
          </span>

          <h1 className="mt-5 text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[1.15] text-white whitespace-pre-line tracking-tight">
            {SITE.hero.headline}
          </h1>

          <p className="mt-5 max-w-2xl text-[15px] sm:text-[17px] leading-relaxed text-white/80">
            {SITE.hero.sub}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center">
            <CTAButton href="#contact" variant="primary" size="lg">
              {SITE.cta.primary}
            </CTAButton>
            <CTAButton href="#pricing" variant="secondary" size="lg">
              {SITE.cta.secondary}
            </CTAButton>
          </div>

          {lowest.n !== Number.POSITIVE_INFINITY && (
            <div className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/85 border border-white/10">
              <span className="rounded-md bg-[var(--kakao)] text-[var(--kakao-text)] px-2 py-0.5 text-xs font-black">
                FROM
              </span>
              <span>
                {lowest.name} <span className="font-black text-white">{lowest.label}</span>
                <span className="text-white/60"> · 부가세 별도</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
