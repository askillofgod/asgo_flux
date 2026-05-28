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
      className="relative isolate overflow-hidden bg-ink pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-40 md:pb-28"
    >
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="orb orb-1 -z-10" style={{ width: 520, height: 520, top: -180, left: -120 }} aria-hidden="true" />
      <div className="orb orb-2 -z-10" style={{ width: 480, height: 480, top: -120, right: -140 }} aria-hidden="true" />
      <div className="orb orb-3 -z-10" style={{ width: 360, height: 360, bottom: -200, left: "30%" }} aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-3xl">
          {/* 고정: Tagline pill */}
          <span className="inline-flex items-center gap-2 rounded-full glass-strong px-3.5 py-1.5 text-[12.5px] sm:text-[13px] font-semibold text-white/90">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[var(--accent-cyan)] opacity-70 blur-[3px]" />
              <span className="relative h-2 w-2 rounded-full bg-[var(--accent-cyan)]" />
            </span>
            {SITE.tagline}
          </span>

          {/* 슬라이드 영역 — title + sub 만 회전 */}
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
                  <h1 className="text-display text-white">{s.title}</h1>
                  <p className="mt-6 max-w-2xl text-lead text-white/80">{s.sub}</p>
                </div>
              );
            })}
          </div>

          {/* 슬라이드 인디케이터 + progress bar */}
          <div className="mt-7 flex items-center gap-4 max-w-md">
            <span className="text-[12px] font-bold tracking-[0.22em] text-white/80 tabular-nums">
              {String(index + 1).padStart(2, "0")}
              <span className="text-white/35"> / {String(SLIDES.length).padStart(2, "0")}</span>
            </span>
            <div className="flex-1 h-[3px] rounded-full bg-white/10 overflow-hidden">
              <div
                key={index}
                data-hero-progress
                className="h-full origin-left rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg,#38bdf8 0%,#2563eb 100%)",
                  animation: `hero-progress ${SLIDE_DURATION}ms linear both`,
                }}
              />
            </div>
          </div>

          {/* 고정: CTA */}
          <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:items-center">
            <a
              href="#contact"
              data-event="cta_hero_primary_click"
              className="inline-flex h-14 sm:h-[60px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] px-8 text-button text-white shadow-[var(--shadow-glow)] transition-all hover:shadow-[var(--shadow-glow-strong)] hover:brightness-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04060f]"
            >
              {SITE.cta.primary}
              <ArrowRight />
            </a>
            <a
              href="#pricing"
              data-event="cta_hero_secondary_click"
              className="inline-flex h-14 sm:h-[60px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl glass-strong px-7 text-button text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {SITE.cta.secondary}
            </a>
          </div>

          {/* 고정: 가격 배지 */}
          {lowest.n !== Number.POSITIVE_INFINITY && (
            <div className="mt-9 inline-flex flex-wrap items-center gap-3 rounded-2xl glass px-4 py-3">
              <span className="rounded-md bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent)] px-2 py-0.5 text-[11px] font-black tracking-wider text-white">
                FROM
              </span>
              <span className="text-[14px] sm:text-[15px] text-white/90">
                {lowest.name}{" "}
                <span className="font-black text-white text-[16px] sm:text-[18px] tracking-tight">
                  {lowest.label}
                </span>
                <span className="text-white/55"> · 부가세 별도</span>
              </span>
            </div>
          )}

          {/* 고정: trust stats */}
          <dl className="mt-12 grid grid-cols-3 max-w-md gap-6">
            <HeroStat label="누적 제작" value="120건+" />
            <HeroStat label="평균 기간" value="2주" />
            <HeroStat label="만족도" value="4.8 / 5" />
          </dl>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#04060f]"
      />
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-white/55 font-semibold">
        {label}
      </dt>
      <dd className="mt-1 text-[20px] sm:text-[22px] font-extrabold tracking-tight text-white">
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
