import { SITE } from "@/data/site";

/**
 * 전화 문의 플로팅 버튼.
 *  - 항상 노출 (스크롤과 무관)
 *  - ScrollTopButton 바로 위에 배치
 *  - 모바일은 sticky CTA + ScrollTopButton 보다 더 위
 *  - 클릭 시 tel: 링크로 즉시 전화 연결
 */
export default function PhoneFAB() {
  return (
    <a
      href={`tel:${SITE.contact.phoneTel}`}
      aria-label="전화 문의하기"
      data-event="cta_phone_fab_click"
      style={{
        // ScrollTop(88) + h-12(48) + gap(8) = 144
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 144px)",
      }}
      className="fixed right-4 sm:right-6 z-30 md:!bottom-[80px] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] text-white shadow-[0_12px_28px_-10px_rgba(37,99,235,0.55)] hover:shadow-[0_16px_36px_-10px_rgba(37,99,235,0.7)] hover:brightness-[1.06] active:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 transition-all"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.02l-2.21 2.19z" />
      </svg>
    </a>
  );
}
