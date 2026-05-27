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
        "relative flex flex-col rounded-2xl border p-6 sm:p-7",
        highlight
          ? "border-[var(--accent)] bg-[var(--primary)] text-white shadow-[0_20px_60px_-15px_rgba(11,31,58,0.45)]"
          : "border-[var(--border)] bg-white text-[var(--primary)]",
      ].join(" ")}
    >
      {product.tag && (
        <span
          className={[
            "absolute -top-3 left-6 inline-block rounded-full px-3 py-1 text-xs font-bold",
            highlight
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--bg-soft)] text-[var(--primary)] border border-[var(--border)]",
          ].join(" ")}
        >
          {product.tag}
        </span>
      )}

      <h3 className="text-xl sm:text-2xl font-extrabold">{product.name}</h3>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl sm:text-4xl font-black tracking-tight">
          {product.price}
        </span>
      </div>
      <p
        className={[
          "mt-1 text-xs",
          highlight ? "text-white/70" : "text-[var(--text-muted)]",
        ].join(" ")}
      >
        {product.priceNote}
      </p>

      <p
        className={[
          "mt-5 text-sm leading-relaxed",
          highlight ? "text-white/85" : "text-[var(--text-muted)]",
        ].join(" ")}
      >
        <span className="font-semibold">추천 대상</span> · {product.recommendFor}
      </p>

      <ul className="mt-5 space-y-2.5 text-[15px]">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <svg
              className={[
                "mt-0.5 h-5 w-5 flex-none",
                highlight ? "text-[var(--kakao)]" : "text-[var(--accent)]",
              ].join(" ")}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 5.296a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.414L8.5 12.09l6.793-6.793a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className={highlight ? "text-white/95" : "text-[var(--text)]"}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <CTAButton
          href="#contact"
          variant={highlight ? "kakao" : "primary"}
          className="w-full"
        >
          이 상품으로 상담받기
        </CTAButton>
      </div>
    </div>
  );
}
