"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/data/site";

const NAV = [
  { href: "/#pricing", label: "가격" },
  { href: "/#service", label: "서비스" },
  { href: "/#process", label: "제작 과정" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-[#04060f]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-6">
        <a
          href="/"
          aria-label={`${SITE.name} 홈으로`}
          className="group flex items-center md:items-start gap-2.5 md:gap-0.5 md:flex-col leading-tight"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SITE.logo}
            alt={SITE.name}
            width={729}
            height={164}
            className="h-6 sm:h-7 w-auto flex-none select-none"
            draggable={false}
          />

          {/* 브랜드명 — 모바일은 로고 오른쪽, 데스크탑은 로고 아래 */}
          <span className="text-[12.5px] md:text-[11.5px] font-semibold tracking-tight text-white/75 leading-none">
            어소그 웹클리닉
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[14px] font-semibold text-white/75 hover:text-white transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="/#contact"
            data-event="cta_header_primary_click"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] px-5 text-[14.5px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.55)] hover:shadow-[0_14px_28px_-10px_rgba(37,99,235,0.7)] hover:brightness-[1.05] transition-all"
          >
            {SITE.cta.primary}
          </a>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="메뉴 열기"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#04060f]/95 backdrop-blur-xl">
          <div className="px-5 py-5 flex flex-col gap-1.5">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3.5 text-[16px] font-semibold text-white/85 hover:bg-white/5"
              >
                {n.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              data-event="cta_header_mobile_primary_click"
              className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] px-5 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.55)]"
            >
              {SITE.cta.primary}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
