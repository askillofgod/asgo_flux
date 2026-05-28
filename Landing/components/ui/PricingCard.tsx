import type { PricingProduct } from "@/data/pricing";
import type { CSSProperties } from "react";

type Props = {
  product: PricingProduct;
};

type CardTheme = {
  bg: string;
  accent: string;
  accentStrong: string;
  accentSoft: string;
  ringGradient: string;
  ringGlow: string;
  buttonGradient: string;
  buttonShadow: string;
  iconGradient: string;
};

/**
 * 상품별 컬러 테마 — 3개 카드 모두 어두운 그라데이션 + 자체 accent 컬러.
 */
const THEMES: Record<string, CardTheme> = {
  onepage: {
    bg: "linear-gradient(135deg,#071527 0%,#0B2545 50%,#111827 100%)",
    accent: "#38BDF8",
    accentStrong: "#2563EB",
    accentSoft: "rgba(56,189,248,0.16)",
    ringGradient: "linear-gradient(135deg,#38BDF8,#2563EB 55%,#6366F1 100%)",
    ringGlow: "rgba(56,189,248,0.30)",
    buttonGradient: "linear-gradient(135deg,#3B82F6,#2563EB 55%,#1D4ED8 100%)",
    buttonShadow: "0 12px 28px -12px rgba(37,99,235,0.60)",
    iconGradient: "linear-gradient(135deg,#38BDF8,#2563EB)",
  },
  "ad-landing": {
    bg: "linear-gradient(135deg,#11112A 0%,#312E81 50%,#581C87 100%)",
    accent: "#A78BFA",
    accentStrong: "#7C3AED",
    accentSoft: "rgba(167,139,250,0.18)",
    ringGradient: "linear-gradient(135deg,#A78BFA,#7C3AED 55%,#C084FC 100%)",
    ringGlow: "rgba(167,139,250,0.30)",
    buttonGradient: "linear-gradient(135deg,#A78BFA,#7C3AED 55%,#6D28D9 100%)",
    buttonShadow: "0 12px 28px -12px rgba(124,58,237,0.60)",
    iconGradient: "linear-gradient(135deg,#A78BFA,#7C3AED)",
  },
  basic: {
    bg: "linear-gradient(135deg,#062A2A 0%,#064E3B 50%,#0F172A 100%)",
    accent: "#34D399",
    accentStrong: "#14B8A6",
    accentSoft: "rgba(52,211,153,0.16)",
    ringGradient: "linear-gradient(135deg,#34D399,#14B8A6 55%,#06B6D4 100%)",
    ringGlow: "rgba(52,211,153,0.28)",
    buttonGradient: "linear-gradient(135deg,#34D399,#10B981 55%,#0F766E 100%)",
    buttonShadow: "0 12px 28px -12px rgba(16,185,129,0.60)",
    iconGradient: "linear-gradient(135deg,#34D399,#14B8A6)",
  },
};

const FALLBACK_THEME = THEMES.onepage;

export default function PricingCard({ product }: Props) {
  const theme = THEMES[product.id] ?? FALLBACK_THEME;
  const isPopular = product.highlight === true;
  const hasEvent = Boolean(product.eventPrice);
  const displayPrice = hasEvent ? product.eventPrice! : product.price;
  const priceNum = displayPrice.replace(/[^0-9]/g, "");

  const cardStyle: CSSProperties = {
    background: theme.bg,
    ["--ring-gradient" as string]: theme.ringGradient,
    ["--ring-glow-color" as string]: theme.ringGlow,
  };

  return (
    <div
      className="ring-glow relative flex flex-col rounded-[22px] p-7 sm:p-8 card-hover text-white border border-transparent"
      style={cardStyle}
    >
      {product.tag && (
        <span
          className="absolute -top-3 left-7 z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-bold tracking-wide text-white"
          style={{
            background: theme.ringGradient,
            boxShadow: `0 8px 22px -8px ${theme.ringGlow}`,
          }}
        >
          {isPopular && <Sparkle />}
          {product.tag}
        </span>
      )}

      <h3 className="text-h3 tracking-tight text-white">{product.name}</h3>

      <div className="mt-5">
        {hasEvent && product.eventLabel && (
          <span
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide border"
            style={{
              backgroundColor: theme.accentSoft,
              color: theme.accent,
              borderColor: `${theme.accent}55`,
            }}
          >
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
            {product.eventLabel}
          </span>
        )}

        {hasEvent && (
          <p className="mt-2 text-[14px] line-through text-white/45">
            정가 {product.price}
          </p>
        )}

        <div className={hasEvent ? "mt-0.5 flex items-baseline gap-2" : "mt-2 flex items-baseline gap-2"}>
          <span className="text-price leading-none text-white">{priceNum}</span>
          <span className="text-[20px] sm:text-[24px] font-extrabold text-white">만 원</span>
        </div>
        <p className="mt-2 text-[13px] text-white/65">{product.priceNote}</p>
      </div>

      <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 text-[14px] leading-relaxed text-white/85">
        <span className="font-bold mr-1.5">추천 대상</span>· {product.recommendFor}
      </p>

      <ul className="mt-6 space-y-3 text-[15px]">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span
              className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md text-white"
              style={{ background: theme.iconGradient }}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path
                  fillRule="evenodd"
                  d="M16.704 5.296a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.414L8.5 12.09l6.793-6.793a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-white/95">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 pt-2">
        <a
          href="#contact"
          data-event={`cta_pricing_${product.id}_click`}
          className="inline-flex h-12 sm:h-[52px] w-full items-center justify-center gap-2 rounded-xl px-5 text-[15px] sm:text-[16px] font-bold text-white transition-all hover:brightness-[1.08] active:brightness-95"
          style={{
            background: theme.buttonGradient,
            boxShadow: theme.buttonShadow,
          }}
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
