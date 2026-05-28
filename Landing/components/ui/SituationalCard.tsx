import type { SituationalProduct } from "@/data/situational";

/**
 * 상황별 맞춤 제작 상품 카드 — 정상가 상품.
 * 절대 취소선/할인 라벨/이벤트 배지를 넣지 말 것.
 */
export default function SituationalCard({ product }: { product: SituationalProduct }) {
  return (
    <article className="card-hover relative flex flex-col rounded-[20px] border border-[var(--border)] bg-white p-5 sm:p-6 shadow-[var(--shadow-card)]">
      {/* 상단 라인: 정상가 배지 + 제작 기간 */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-soft)] border border-[var(--border)] px-2.5 py-0.5 text-[10.5px] font-bold tracking-[0.12em] text-[var(--text-muted)] uppercase">
          정상가
        </span>
        <span className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[var(--text-muted)]">
          <ClockIcon />
          제작 {product.duration}
        </span>
      </div>

      <h3 className="mt-3 text-[16.5px] sm:text-[17.5px] font-extrabold tracking-tight text-[var(--primary)] leading-snug">
        {product.name}
      </h3>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-[24px] sm:text-[26px] font-black text-[var(--primary)] tracking-tight leading-none">
          {product.price}
        </span>
      </div>

      <p className="mt-4 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)] px-3 py-2 text-[12.5px] leading-relaxed text-[var(--text-soft)]">
        <span className="font-bold mr-1.5">추천 대상</span>· {product.recommendFor}
      </p>

      <ul className="mt-4 space-y-1.5 text-[13px] leading-relaxed text-[var(--text-soft)] flex-1">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span
              aria-hidden="true"
              className="mt-[7px] inline-block h-1 w-1 flex-none rounded-full bg-[var(--accent)]"
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {product.note && (
        <p className="mt-4 text-[11.5px] text-[var(--text-muted)] leading-relaxed">
          {product.note}
        </p>
      )}

      <a
        href="/#contact"
        data-event={`cta_situational_${product.id}_click`}
        className="mt-5 inline-flex h-10 sm:h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-[var(--primary)]/20 bg-white px-4 text-[13.5px] font-bold text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
      >
        이 상품으로 상담받기
      </a>
    </article>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-3 w-3">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm.75 4a.75.75 0 00-1.5 0v4c0 .2.08.39.22.53l2.5 2.5a.75.75 0 101.06-1.06l-2.28-2.28V6z" />
    </svg>
  );
}
