import type { PricingProduct } from "@/data/pricing";

type Props = {
  product: PricingProduct;
};

export default function PricingCard({ product }: Props) {
  const highlight = product.highlight === true;
  const hasEvent = Boolean(product.eventPrice);
  const displayPrice = hasEvent ? product.eventPrice! : product.price;
  const priceNum = displayPrice.replace(/[^0-9]/g, "");

  return (
    <div
      className={[
        "relative flex flex-col rounded-[22px] p-7 sm:p-8 card-hover",
        highlight
          ? "ring-glow bg-[#0a1126] text-white border border-transparent md:-mt-3 md:mb-3 md:scale-[1.02]"
          : "card-light text-[var(--primary)]",
      ].join(" ")}
    >
      {product.tag && (
        <span
          className={[
            "absolute -top-3 left-7 z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-bold tracking-wide",
            highlight
              ? "bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent)] text-white shadow-[0_8px_22px_-8px_rgba(56,189,248,0.7)]"
              : "bg-white text-[var(--primary)] border border-[var(--border-strong)]",
          ].join(" ")}
        >
          {highlight && <Sparkle />}
          {product.tag}
        </span>
      )}

      <h3 className="text-h3 tracking-tight">{product.name}</h3>

      <div className="mt-5">
        {hasEvent && product.eventLabel && (
          <span
            className={[
              "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide",
              highlight
                ? "bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30"
                : "bg-[var(--accent)]/[0.10] text-[var(--accent-strong)] border border-[var(--accent)]/20",
            ].join(" ")}
          >
            <CarrotDot />
            {product.eventLabel}
          </span>
        )}

        {hasEvent && (
          <p
            className={[
              "mt-2 text-[14px] line-through",
              highlight ? "text-white/45" : "text-[var(--text-muted)]",
            ].join(" ")}
          >
            정가 {product.price}
          </p>
        )}

        <div className={hasEvent ? "mt-0.5 flex items-baseline gap-2" : "mt-2 flex items-baseline gap-2"}>
          <span
            className={[
              "text-price leading-none",
              highlight
                ? "text-white"
                : hasEvent
                ? "text-[var(--accent-strong)]"
                : "text-[var(--primary)]",
            ].join(" ")}
          >
            {priceNum}
          </span>
          <span
            className={[
              "text-[20px] sm:text-[24px] font-extrabold",
              highlight
                ? "text-white"
                : hasEvent
                ? "text-[var(--accent-strong)]"
                : "text-[var(--primary)]",
            ].join(" ")}
          >
            만 원
          </span>
        </div>
        <p className={`mt-2 text-[13px] ${highlight ? "text-white/65" : "text-[var(--text-muted)]"}`}>
          {product.priceNote}
        </p>
      </div>

      <p
        className={[
          "mt-6 rounded-xl px-3.5 py-2.5 text-[14px] leading-relaxed",
          highlight
            ? "bg-white/[0.06] text-white/85 border border-white/10"
            : "bg-[var(--bg-soft)] text-[var(--text-soft)] border border-[var(--border)]",
        ].join(" ")}
      >
        <span className="font-bold mr-1.5">추천 대상</span>· {product.recommendFor}
      </p>

      <ul className="mt-6 space-y-3 text-[15px]">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span
              className={[
                "mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md",
                highlight
                  ? "bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent)] text-white"
                  : "bg-[var(--accent)]/12 text-[var(--accent)]",
              ].join(" ")}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path
                  fillRule="evenodd"
                  d="M16.704 5.296a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.414L8.5 12.09l6.793-6.793a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className={highlight ? "text-white/95" : "text-[var(--text-soft)]"}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 pt-2">
        <a
          href="#contact"
          data-event={`cta_pricing_${product.id}_click`}
          className={
            highlight
              ? "inline-flex h-12 sm:h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] px-5 text-[15px] sm:text-[16px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(37,99,235,0.6)] hover:shadow-[0_16px_36px_-12px_rgba(37,99,235,0.75)] hover:brightness-[1.05] transition-all"
              : "inline-flex h-12 sm:h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-[15px] sm:text-[16px] font-bold text-white hover:bg-[var(--accent-strong)] transition-colors"
          }
        >
          이 상품으로 상담받기
        </a>
      </div>
    </div>
  );
}

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden="true">
      <path d="M12 2l1.6 5.6L19 9l-5.4 1.4L12 16l-1.6-5.6L5 9l5.4-1.4L12 2zm7 11l.9 3 .1 1-3-1L19 13zM5 16l.7 2.4 2.3.6-2.3.7L5 22l-.7-2.3-2.3-.7 2.3-.6L5 16z" />
    </svg>
  );
}

function CarrotDot() {
  // 당근 상징 작은 도트 아이콘
  return (
    <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
  );
}
