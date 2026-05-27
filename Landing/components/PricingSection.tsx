import SectionTitle from "./ui/SectionTitle";
import PricingCard from "./ui/PricingCard";
import { PRICING } from "@/data/pricing";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative bg-[var(--bg-soft)] py-24 sm:py-28 md:py-32"
    >
      {/* 윗 페이드 */}
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

        <div className="mt-16 grid gap-8 md:gap-7 md:grid-cols-3 md:items-stretch">
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
