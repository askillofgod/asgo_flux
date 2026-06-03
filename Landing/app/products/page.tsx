import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import SituationalCard from "@/components/ui/SituationalCard";
import { SITE } from "@/data/site";
import { SITUATIONAL } from "@/data/situational";

export const metadata: Metadata = {
  title: {
    absolute: "추가 제작 상품 | ASOG 웹 클리닉",
  },
  description:
    "브랜딩, 광고 준비, 상세페이지, 리뉴얼까지 — 목적에 맞춰 선택할 수 있는 ASOG 웹 클리닉의 추가 제작 상품 8종을 소개합니다.",
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE.name,
    title: "추가 제작 상품 | ASOG 웹 클리닉",
    description:
      "브랜딩, 광고 준비, 상세페이지, 리뉴얼까지 — 목적에 맞춰 선택할 수 있는 추가 제작 상품 8종.",
    url: `${SITE.url}/products`,
    images: [
      {
        url: `${SITE.url}${SITE.ogImage}`,
        width: 1727,
        height: 910,
        alt: `${SITE.name} — 추가 제작 상품`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "추가 제작 상품 | ASOG 웹 클리닉",
    description:
      "브랜딩, 광고 준비, 상세페이지, 리뉴얼까지 — 추가 제작 상품 8종.",
  },
};

export default function ProductsPage() {
  return (
    <>
      <ProductsIntro />
      <ProductsGrid />
      <ClosingCTA />
    </>
  );
}

/* ============================================================
   1) Intro
   ============================================================ */
function ProductsIntro() {
  return (
    <section className="relative isolate overflow-hidden bg-clinic pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="orb orb-1 -z-10" style={{ width: 520, height: 520, top: -180, left: -120 }} aria-hidden="true" />
      <div className="orb orb-2 -z-10" style={{ width: 480, height: 480, top: -120, right: -140 }} aria-hidden="true" />

      <div className="mx-auto max-w-3xl px-5 sm:px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[var(--border)] px-3.5 py-1.5 text-[12.5px] sm:text-[13px] font-semibold text-[var(--accent-strong)]">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          PRODUCTS
        </span>
        <h1 className="mt-6 text-display text-[var(--primary)]">
          추가 제작 상품
        </h1>
        <p className="mt-7 text-lead text-[var(--text-muted)]">
          브랜딩, 광고 준비, 상세페이지, 리뉴얼까지
          <br />
          필요한 목적에 맞춰 선택할 수 있습니다.
        </p>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-soft)] border border-[var(--border)] px-3 py-1 text-[11.5px] font-bold tracking-[0.12em] text-[var(--text-muted)] uppercase">
          정상가 상품 · 할인 대상 아님
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   2) Products grid (8 cards)
   ============================================================ */
function ProductsGrid() {
  return (
    <section className="bg-[var(--bg-soft)] py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SITUATIONAL.map((p) => (
            <SituationalCard key={p.id} product={p} />
          ))}
        </div>
        <p className="mt-12 text-center text-[12.5px] sm:text-sm text-[var(--text-muted)] leading-relaxed">
          * 가격은 모두 정상가 기준이며, 상세 견적은 상담 후 안내드립니다. 부가세 별도.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   3) Closing CTA
   ============================================================ */
function ClosingCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-clinic-deep py-20 sm:py-24 md:py-28 text-center">
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="orb orb-2 -z-10" style={{ width: 460, height: 460, top: -160, left: "10%" }} aria-hidden="true" />
      <div className="orb orb-1 -z-10" style={{ width: 460, height: 460, bottom: -200, right: "5%" }} aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl px-5 sm:px-6">
        <h2 className="text-h2 text-[var(--primary)]">
          어떤 상품이 맞을지{" "}
          <span className="text-gradient">함께 정해드릴게요</span>
        </h2>
        <p className="mt-5 text-lead text-[var(--text-muted)]">
          홈페이지 제작 이후 광고, 브랜딩, 상세페이지, 리뉴얼이 필요한 경우 상황에 맞춰 별도 상담 후 진행됩니다.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/#contact"
            data-event="cta_products_closing_contact_click"
            className="inline-flex h-14 sm:h-[60px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] px-8 text-button text-white shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] hover:brightness-[1.05] transition-all"
          >
            무료 상담 신청하기
          </a>
          <a
            href="/"
            data-event="cta_products_back_home_click"
            className="inline-flex h-14 sm:h-[60px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-white border border-[var(--border-strong)] px-7 text-button text-[var(--primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            메인으로 돌아가기
          </a>
        </div>
      </div>
    </section>
  );
}
