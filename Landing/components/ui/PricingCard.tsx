import type { PricingProduct } from "@/data/pricing";
import type { CSSProperties } from "react";

type Props = {
  product: PricingProduct;
};

export default function PricingCard({ product }: Props) {
  const isPopular = product.highlight === true;
  const hasEvent = Boolean(product.eventPrice);
  const displayPrice = hasEvent ? product.eventPrice! : product.price;
  const priceNum = displayPrice.replace(/[^0-9]/g, "");

  const cardStyle: CSSProperties = isPopular
    ? {
        background:
          "linear-gradient(180deg, #ffffff 0%, #f8fcff 60%, #eff8ff 100%)",
      }
    : { background: "#ffffff" };

  return (
    <div
      className={[
        "relative flex flex-col rounded-[22px] p-7 sm:p-8 card-hover",
        isPopular
          ? "ring-glow border border-transparent shadow-[var(--shadow-soft)]"
          : "border border-[var(--border)] shadow-[var(--shadow-card)]",
      ].join(" ")}
      style={cardStyle}
    >
      {product.tag && (
        <span
          className={[
            "absolute -top-3 left-7 z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-bold tracking-wide",
            isPopular
              ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-cyan)] text-white shadow-[0_8px_22px_-8px_rgba(56,189,248,0.6)]"
              : "bg-white text-[var(--accent-strong)] border border-[var(--border-strong)]",
          ].join(" ")}
        >
          {isPopular && <Sparkle />}
          {product.tag}
        </span>
      )}

      <h3 className="text-h3 tracking-tight text-[var(--primary)]">
        {product.name}
      </h3>

      <div className="mt-5">
        {hasEvent && product.eventLabel && (
          <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-bold tracking-wide border bg-[var(--accent)]/[0.06] border-[var(--accent)]/30 text-[var(--accent-strong)]">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            <span className="font-black">이벤트 할인중</span>
            <span className="opacity-60">·</span>
            <span>{product.eventLabel}</span>
          </span>
        )}

        {hasEvent && (
          <p className="mt-2 text-[14px] line-through text-[var(--text-faint)]">
            정가 {product.price}
          </p>
        )}

        <div className={hasEvent ? "mt-0.5 flex items-baseline gap-2" : "mt-2 flex items-baseline gap-2"}>
          <span className="text-price leading-none text-[var(--accent-strong)]">{priceNum}</span>
          <span className="text-[20px] sm:text-[24px] font-extrabold text-[var(--accent-strong)]">만 원</span>
        </div>
        <p className="mt-2 text-[13px] text-[var(--text-muted)]">{product.priceNote}</p>
      </div>

      <p className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-3.5 py-2.5 text-[14px] leading-relaxed text-[var(--text-muted)]">
        <span className="font-bold mr-1.5 text-[var(--primary)]">추천 대상</span>· {product.recommendFor}
      </p>

      <ul className="mt-6 space-y-3 text-[15px]">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] text-white">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path
                  fillRule="evenodd"
                  d="M16.704 5.296a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.414L8.5 12.09l6.793-6.793a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-[var(--text-muted)]">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 pt-2">
        <a
          href="#contact"
          data-event={`cta_pricing_${product.id}_click`}
          className={
            isPopular
              ? "inline-flex h-12 sm:h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] px-5 text-[15px] sm:text-[16px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(37,99,235,0.55)] hover:shadow-[0_16px_36px_-12px_rgba(37,99,235,0.7)] hover:brightness-[1.05] transition-all"
              : "inline-flex h-12 sm:h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-white border border-[var(--border-strong)] px-5 text-[15px] sm:text-[16px] font-bold text-[var(--primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
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
