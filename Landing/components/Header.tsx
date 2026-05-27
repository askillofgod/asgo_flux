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
        "fixed inset-x-0 top-0 z-50 transition-colors",
        scrolled
          ? "bg-white/90 backdrop-blur border-b border-[var(--border)]"
          : "bg-white/70 backdrop-blur",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--primary)] text-white text-sm font-black">
            A
          </span>
          <span className="text-[15px] sm:text-base font-extrabold text-[var(--primary)]">
            {SITE.brandShort}
            <span className="ml-1 hidden sm:inline text-[var(--text-muted)] font-medium">
              정찰제 홈페이지 제작소
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent)]"
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
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--primary)]"
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
        <div className="md:hidden border-t border-[var(--border)] bg-white">
          <div className="px-4 py-4 flex flex-col gap-2">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] font-semibold text-[var(--primary)] hover:bg-[var(--bg-soft)]"
              >
                {n.label}
              </a>
            ))}
            <CTAButton href="#contact" variant="primary" size="md" className="mt-2 w-full">
              {SITE.cta.primary}
            </CTAButton>
          </div>
        </div>
      )}
    </header>
  );
}
