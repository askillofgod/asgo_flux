"use client";

import { SITE } from "@/data/site";

export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="mx-auto flex max-w-md gap-2 p-3">
        <a
          href={SITE.contact.kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--kakao)] text-[var(--kakao-text)] text-sm font-bold shadow-lg"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M12 3C6.477 3 2 6.477 2 10.77c0 2.77 1.86 5.197 4.66 6.57-.21.73-.76 2.69-.87 3.12-.14.53.19.52.4.38.17-.11 2.66-1.8 3.73-2.52.68.1 1.38.15 2.08.15 5.523 0 10-3.477 10-7.7C22 6.477 17.523 3 12 3z" />
          </svg>
          카카오 상담
        </a>
        <a
          href="#contact"
          className="flex-1 inline-flex h-12 items-center justify-center rounded-xl bg-[var(--accent)] text-white text-sm font-bold shadow-lg"
        >
          무료 상담 신청
        </a>
      </div>
    </div>
  );
}
