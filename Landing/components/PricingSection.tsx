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
            <p className="mt-2 text-[14px] sm:text-[15px] leading-relaxed text-[var(--text-muted)]">
              처음 광고를 시작하는 분들을 위해, 홈페이지 제작 비용을 더 낮췄습니다.
              기존 정가는 그대로 공개하고, 이벤트 기간 동안만 특별가로 상담을 진행합니다.
            </p>
            <p className="mt-1.5 text-[12.5px] sm:text-[13px] text-[var(--text-faint)]">
              이벤트 종료일은 추후 안내 예정입니다.
            </p>
          </div>
        </div>

        {/* 대표 이벤트 상품 3개 */}
        <div className="mt-12 grid gap-8 md:gap-7 md:grid-cols-3 md:items-stretch">
          {PRICING.map((p) => (
            <PricingCard key={p.id} product={p} />
          ))}
        </div>

        {/* 추가 상품 자세히 보기 */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <a
            href="/products"
            data-event="cta_pricing_view_products_click"
            className="inline-flex h-12 sm:h-[52px] items-center justify-center gap-2 rounded-xl bg-white border border-[var(--border-strong)] px-7 text-[15px] sm:text-[16px] font-bold text-[var(--primary)] shadow-[var(--shadow-card)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            추가 상품 자세히 보기
            <ArrowRight />
          </a>
          <p className="text-center text-[12.5px] sm:text-[13px] text-[var(--text-muted)] leading-relaxed">
            브랜딩, 광고 준비, 상세페이지, 리뉴얼 상품은 별도 페이지에서 확인할 수 있습니다.
          </p>
        </div>

        <p className="mt-10 text-center text-[13px] sm:text-sm text-[var(--text-muted)] leading-relaxed">
          * 도메인·호스팅 비용은 별도이며, 원하시는 경우 진행을 도와드립니다.
        </p>
      </div>
    </section>
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
