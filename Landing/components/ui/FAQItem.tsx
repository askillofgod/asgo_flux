"use client";

import { useState } from "react";

type Props = {
  q: string;
  a: string;
  defaultOpen?: boolean;
};

export default function FAQItem({ q, a, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--border)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] sm:text-base font-bold text-[var(--primary)]">
          Q. {q}
        </span>
        <span
          className={[
            "mt-1 h-6 w-6 flex-none rounded-full bg-[var(--bg-soft)] text-[var(--primary)] flex items-center justify-center transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-5 pr-9 text-[14.5px] sm:text-[15px] leading-relaxed text-[var(--text-muted)]">
          {a}
        </div>
      )}
    </div>
  );
}
