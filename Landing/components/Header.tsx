"use client";

import { useEffect, useState } from "react";
import CTAButton from "./ui/CTAButton";
import { SITE } from "@/data/site";

const NAV = [
  { href: "#pricing", label: "가격" },
  { href: "#service", label: "서비스" },
  { href: "#process", label: "제작 과정" },
  { href: "#faq", label: "FAQ" },
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
          ? "bg-[#06091a]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent)] text-white text-sm font-black shadow-[0_4px_14px_-4px_rgba(37,99,235,0.55)]">
            A
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[15px] font-extrabold text-white tracking-tight">
              ASOG
            </span>
            <span className="hidden sm:block text-[10.5px] font-medium tracking-wider text-white/55 uppercase">
              정찰제 홈페이지 제작소
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[13.5px] font-semibold text-white/75 hover:text-white transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <CTAButton href="#contact" variant="primary" size="md">
            {SITE.cta.primary}
          </CTAButton>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-white"
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
        <div className="md:hidden border-t border-white/10 bg-[#06091a]/95 backdrop-blur-xl">
          <div className="px-4 py-4 flex flex-col gap-1.5">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] font-semibold text-white/85 hover:bg-white/5"
              >
                {n.label}
              </a>
            ))}
            <CTAButton
              href="#contact"
              variant="primary"
              size="md"
              className="mt-2 w-full"
            >
              {SITE.cta.primary}
            </CTAButton>
          </div>
        </div>
      )}
    </header>
  );
}
