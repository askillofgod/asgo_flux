import SectionTitle from "./ui/SectionTitle";
import PricingCard from "./ui/PricingCard";
import { PRICING } from "@/data/pricing";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative bg-[var(--bg-soft)] py-24 sm:py-28 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="PRICING"
          title={"가격이 먼저 보이는\n정찰제 홈페이지 제작"}
          description="견적을 받느라 시간 쓰지 마세요. 모든 상품 가격을 공개합니다. (부가세 별도)"
        />

        {/* 당근 첫 광고 이벤트 배너 */}
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="relative overflow-hidden rounded-[22px] border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/[0.06] via-white to-[var(--accent-cyan)]/[0.08] px-5 py-6 sm:px-7 sm:py-7 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-cyan)] px-3 py-1 text-[11.5px] font-bold tracking-wider text-white">
              <span aria-hidden="true">🥕</span>
              EVENT
            </span>
            <h3 className="mt-3 text-[19px] sm:text-[22px] font-extrabold tracking-tight text-[var(--primary)]">
              당근 첫 광고 기념 이벤트
            </h3>
            <p className="mt-2 text-[14px] sm:text-[15px] leading-relaxed text-[var(--text-soft)]">
              처음 광고를 시작하는 분들을 위해, 홈페이지 제작 비용을 더 낮췄습니다.
              기존 정가는 그대로 공개하고, 이벤트 기간 동안만 특별가로 상담을 진행합니다.
            </p>
            <p className="mt-1.5 text-[12.5px] sm:text-[13px] text-[var(--text-muted)]">
              이벤트 종료일은 추후 안내 예정입니다.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:gap-7 md:grid-cols-3 md:items-stretch">
          {PRICING.map((p) => (
            <PricingCard key={p.id} product={p} />
          ))}
        </div>

        <p className="mt-12 text-center text-[13px] sm:text-sm text-[var(--text-muted)]">
          * 도메인·호스팅 비용은 별도이며, 원하시는 경우 진행을 도와드립니다.
        </p>
      </div>
    </section>
  );
}
