"use client";

import { useEffect, useState } from "react";

/**
 * 우측 하단에 떠 있는 "맨 위로" 버튼.
 *  - 페이지 상단에서는 숨김
 *  - scrollY > 300 시 fade + slide up 으로 등장
 *  - 모바일에선 StickyMobileCTA 위로 띄움 (safe-area + 88px)
 *  - 데스크톱에선 우측 하단 24px
 */
const SCROLL_THRESHOLD = 300;

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      data-event="cta_scroll_top_click"
      onClick={onClick}
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 88px)",
      }}
      className={[
        "fixed right-4 sm:right-6 z-30",
        "md:!bottom-6",
        "inline-flex h-12 w-12 items-center justify-center",
        "rounded-full bg-[var(--primary)] text-white",
        "shadow-[0_12px_28px_-10px_rgba(11,31,58,0.45)] hover:shadow-[0_16px_36px_-10px_rgba(37,99,235,0.5)]",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none",
      ].join(" ")}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path
          fillRule="evenodd"
          d="M10 5a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 7.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5A1 1 0 0110 5z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
