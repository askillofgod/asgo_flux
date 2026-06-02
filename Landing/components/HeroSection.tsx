"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SITE } from "@/data/site";
import { PRICING } from "@/data/pricing";

const SLIDE_DURATION = 4500;
const TRANSITION_DURATION = 600;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-gradient">{children}</span>;
}

const SLIDES: { title: ReactNode; sub: ReactNode }[] = [
  {
    title: (
      <>
        홈페이지 제작,
        <br />
        <Highlight>견적</Highlight>부터 막막하셨나요?
      </>
    ),
    sub: (
      <>
        복잡한 비용 걱정 없이
        <br />
        필요한 페이지만 먼저 시작하세요.
      </>
    ),
  },
  {
    title: (
      <>
        ASOG는 제작 비용을
        <br />
        먼저 공개합니다.
      </>
    ),
    sub: (
      <>
        랜딩페이지 · 상세페이지 · 홈페이지를
        <br />
        <Highlight>정찰제</Highlight>로 투명하게 제작합니다.
      </>
    ),
  },
  {
    title: (
      <>
        기획부터 디자인,
        <br />
        반응형과 <Highlight>기본 SEO</Highlight>까지.
      </>
    ),
    sub: (
      <>
        처음 의뢰하는 분도 이해하기 쉽게
        <br />
        제작 과정을 안내합니다.
      </>
    ),
  },
  {
    title: (
      <>
        상담은 가볍게,
        <br />
        제작은 정확하게.
      </>
    ),
    sub: (
      <>
        <Highlight>무료 상담</Highlight>으로 필요한 범위와
        <br />
        예상 비용을 먼저 확인하세요.
      </>
    ),
  },
];

const lowest = PRICING.reduce(
  (min, p) => {
    const label = p.eventPrice ?? p.price;
    const n = parseInt(label.replace(/[^0-9]/g, ""), 10);
    return n < min.n ? { n, label, name: p.name } : min;
  },
  { n: Number.POSITIVE_INFINITY, label: "", name: "" }
);

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-clinic pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-40 md:pb-28"
    >
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="orb orb-1 -z-10" style={{ width: 520, height: 520, top: -180, left: -120 }} aria-hidden="true" />
      <div className="orb orb-2 -z-10" style={{ width: 480, height: 480, top: -120, right: -140 }} aria-hidden="true" />
      <div className="orb orb-3 -z-10" style={{ width: 360, height: 360, bottom: -200, left: "30%" }} aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-12 md:gap-10 lg:gap-14 md:grid-cols-[1fr_minmax(0,403px)] items-center md:items-end">
          <div className="min-w-0">
          {/* Tagline pill */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[var(--border)] px-3.5 py-1.5 text-[12.5px] sm:text-[13px] font-semibold text-[var(--accent-strong)] shadow-[0_4px_12px_-8px_rgba(37,99,235,0.25)]">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-70 blur-[3px]" />
              <span className="relative h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            {SITE.tagline}
          </span>

          {/* 슬라이드 영역 */}
          <div
            className="relative mt-7 grid"
            aria-live="polite"
            aria-roledescription="carousel"
          >
            {SLIDES.map((s, i) => {
              const isActive = i === index;
              return (
                <div
                  key={i}
                  aria-hidden={!isActive}
                  className="col-start-1 row-start-1 motion-reduce:!transform-none"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity ${TRANSITION_DURATION}ms ${EASING}, transform ${TRANSITION_DURATION}ms ${EASING}`,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <h1 className="text-display text-[var(--primary)]">{s.title}</h1>
                  <p className="mt-6 max-w-2xl text-lead text-[var(--text-muted)]">{s.sub}</p>
                </div>
              );
            })}
          </div>

          {/* 인디케이터 + progress */}
          <div className="mt-7 flex items-center gap-4 max-w-md">
            <span className="text-[12px] font-bold tracking-[0.22em] text-[var(--text-muted)] tabular-nums">
              {String(index + 1).padStart(2, "0")}
              <span className="text-[var(--text-faint)]"> / {String(SLIDES.length).padStart(2, "0")}</span>
            </span>
            <div className="flex-1 h-[3px] rounded-full bg-[var(--border)] overflow-hidden">
              <div
                key={index}
                data-hero-progress
                className="h-full origin-left rounded-full"
                style={{
                  background: "linear-gradient(90deg,#38bdf8 0%,#2563eb 100%)",
                  animation: `hero-progress ${SLIDE_DURATION}ms linear both`,
                }}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:items-center">
            {/* 모바일: 전화 연결 */}
            <a
              href={`tel:${SITE.contact.phoneTel}`}
              aria-label="전화상담 신청"
              data-event="cta_hero_primary_tel_click"
              className="md:hidden inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] px-8 text-button text-white shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] hover:brightness-[1.05] transition-all"
            >
              <PhoneIconSmall />
              전화상담 신청
            </a>
            {/* md+: #contact 스크롤 */}
            <a
              href="#contact"
              data-event="cta_hero_primary_click"
              className="hidden md:inline-flex h-[60px] w-auto items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] px-8 text-button text-white shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] hover:brightness-[1.05] transition-all"
            >
              {SITE.cta.primary}
              <ArrowRight />
            </a>
            <a
              href="#pricing"
              data-event="cta_hero_secondary_click"
              className="inline-flex h-14 sm:h-[60px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-white border border-[var(--border-strong)] px-7 text-button text-[var(--primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              {SITE.cta.secondary}
            </a>
          </div>

          {/* FROM 배지 */}
          {lowest.n !== Number.POSITIVE_INFINITY && (
            <div className="mt-9 inline-flex flex-wrap items-center gap-3 rounded-2xl bg-white border border-[var(--border)] px-4 py-3 shadow-[var(--shadow-card)]">
              <span className="rounded-md bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent)] px-2 py-0.5 text-[11px] font-black tracking-wider text-white">
                FROM
              </span>
              <span className="text-[14px] sm:text-[15px] text-[var(--text-muted)]">
                {lowest.name}{" "}
                <span className="font-black text-[var(--primary)] text-[16px] sm:text-[18px] tracking-tight">
                  {lowest.label}
                </span>
                <span className="text-[var(--text-faint)]"> · 부가세 별도</span>
              </span>
            </div>
          )}

          {/* Trust stats */}
          <dl className="mt-12 grid grid-cols-3 max-w-md gap-6">
            <HeroStat label="누적 제작" value="120건+" />
            <HeroStat label="평균 기간" value="2주" />
            <HeroStat label="만족도" value="4.8 / 5" />
          </dl>
          </div>

          {/* 우측 Hero 이미지 — 모바일은 텍스트 아래에 자연스럽게 */}
          <div className="w-full max-w-[403px] mx-auto md:mx-0 md:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero_1.webp"
              alt="ASOG 웹 클리닉 — 홈페이지 진단·제작 상담"
              width={524}
              height={820}
              loading="eager"
              fetchPriority="high"
              className="block w-full h-auto select-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-[var(--text-faint)] font-semibold">
        {label}
      </dt>
      <dd className="mt-1 text-[20px] sm:text-[22px] font-extrabold tracking-tight text-[var(--primary)]">
        {value}
      </dd>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5">
      <path
        fillRule="evenodd"
        d="M10.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PhoneIconSmall() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.02l-2.21 2.19z" />
    </svg>
  );
}
