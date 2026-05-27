import CTAButton from "./CTAButton";
import type { PricingProduct } from "@/data/pricing";

type Props = {
  product: PricingProduct;
};

export default function PricingCard({ product }: Props) {
  const highlight = product.highlight === true;

  return (
    <div
      className={[
        "relative flex flex-col rounded-2xl p-6 sm:p-7 card-hover",
        highlight
          ? "ring-glow bg-[var(--primary)] text-white border border-transparent md:-mt-2 md:mb-2"
          : "bg-white text-[var(--primary)] border border-[var(--border)] shadow-[var(--shadow-card)]",
      ].join(" ")}
    >
      {product.tag && (
        <span
          className={[
            "absolute -top-3 left-6 z-10 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11.5px] font-bold tracking-wide",
            highlight
              ? "bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent)] text-white shadow-[0_6px_18px_-6px_rgba(56,189,248,0.7)]"
              : "bg-white text-[var(--primary)] border border-[var(--border-strong)]",
          ].join(" ")}
        >
          {highlight && <Sparkle />}
          {product.tag}
        </span>
      )}

      <h3 className="text-[19px] sm:text-[22px] font-extrabold tracking-tight">
        {product.name}
      </h3>

      <div className="mt-5">
        <div className="flex items-baseline gap-1.5">
          <span
            className={[
              "text-[40px] sm:text-[48px] font-black tracking-tight leading-none",
              highlight ? "text-white" : "text-[var(--primary)]",
            ].join(" ")}
          >
            {product.price.replace(/[^0-9]/g, "")}
          </span>
          <span
            className={[
              "text-[18px] sm:text-[22px] font-bold",
              highlight ? "text-white" : "text-[var(--primary)]",
            ].join(" ")}
          >
            만 원
          </span>
        </div>
        <p
          className={[
            "mt-2 text-[12.5px]",
            highlight ? "text-white/65" : "text-[var(--text-muted)]",
          ].join(" ")}
        >
          {product.priceNote}
        </p>
      </div>

      <p
        className={[
          "mt-5 rounded-xl px-3 py-2 text-[13.5px] leading-relaxed",
          highlight
            ? "bg-white/[0.06] text-white/85 border border-white/10"
            : "bg-[var(--bg-soft)] text-[var(--text-muted)] border border-[var(--border)]",
        ].join(" ")}
      >
        <span className="font-bold mr-1.5">
          {highlight ? "추천 대상" : "추천 대상"}
        </span>
        · {product.recommendFor}
      </p>

      <ul className="mt-5 space-y-2.5 text-[14.5px]">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span
              className={[
                "mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md",
                highlight
                  ? "bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent)] text-white"
                  : "bg-[var(--accent)]/10 text-[var(--accent)]",
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
            <span
              className={highlight ? "text-white/95" : "text-[var(--text)]"}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-7 pt-2">
        <CTAButton
          href="#contact"
          variant={highlight ? "primary" : "secondary"}
          className="w-full"
        >
          이 상품으로 상담받기
        </CTAButton>
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
