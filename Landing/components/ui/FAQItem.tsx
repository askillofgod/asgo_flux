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
    <div
      className={[
        "rounded-[22px] border bg-white transition-all",
        open
          ? "border-[var(--accent)]/30 shadow-[0_10px_32px_-18px_rgba(37,99,235,0.4)]"
          : "border-[var(--border)] hover:border-[var(--border-strong)]",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 px-6 sm:px-7 py-6 text-left"
        aria-expanded={open}
      >
        <span className="flex items-start gap-3.5">
          <span
            className={[
              "mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-md text-[12px] font-black",
              open
                ? "bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] text-white"
                : "bg-[var(--accent)]/10 text-[var(--accent)]",
            ].join(" ")}
            aria-hidden="true"
          >
            Q
          </span>
          <span className="text-[16px] sm:text-[17px] font-bold text-[var(--primary)] leading-snug">
            {q}
          </span>
        </span>
        <span
          className={[
            "mt-1 h-8 w-8 flex-none rounded-full bg-[var(--bg-soft)] text-[var(--primary)] flex items-center justify-center transition-transform",
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
        <div className="px-6 sm:px-7 pb-7 -mt-1 pl-[60px] sm:pl-[64px] text-body text-[var(--text-soft)]">
          {a}
        </div>
      )}
    </div>
  );
}
