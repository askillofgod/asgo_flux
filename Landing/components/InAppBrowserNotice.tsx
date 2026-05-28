"use client";

import { useEffect, useState } from "react";

/**
 * 인앱브라우저(카카오톡/당근/인스타/페북 등)에서 페이지가 열렸을 때
 * 외부 브라우저로 열도록 안내하는 bottom sheet 팝업.
 *
 * - User-Agent 기반 감지 (보수적: 명확한 인앱 시그니처만 매칭)
 * - sessionStorage 로 같은 세션 동안 재노출 방지
 * - "주소 복사하기" 클릭 시 현재 URL 클립보드 복사
 *
 * 브라우저 정책상 인앱에서 외부 브라우저를 강제로 띄울 수 없어
 * "안내 + 주소 복사" 방식으로 구현.
 */

const PATTERNS: RegExp[] = [
  /KakaoTalk/i, // 카카오톡
  /Daangn/i,     // 당근
  /Karrot/i,     // 당근 영문 UA
  /Instagram/i,  // 인스타그램
  /FBAN|FBAV/,   // 페이스북 (대소문자 구분 — 정확한 시그니처)
  /Line\//,      // 라인 ("Line/x.x.x")
  /NAVER/,       // 네이버
  /Twitter/i,    // X(트위터)
  /; wv\)/,      // 안드로이드 WebView 표준 마커
  /WebView/i,    // 일반 WebView
];

const STORAGE_KEY = "asog:inapp-notice-dismissed";

function isInAppBrowser(ua: string): boolean {
  return PATTERNS.some((p) => p.test(ua));
}

export default function InAppBrowserNotice() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* SSR or storage 비활성 환경 — 무시 */
    }
    const ua = window.navigator?.userAgent ?? "";
    if (isInAppBrowser(ua)) setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  const onCopy = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // 비-HTTPS 또는 구식 인앱 폴백
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
    } catch (e) {
      console.error("[InAppBrowserNotice] copy failed:", e);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="iab-title"
      className="fixed inset-0 z-[60] flex items-end justify-center"
    >
      {/* dim backdrop (탭하면 dismiss) */}
      <button
        type="button"
        aria-label="닫기"
        onClick={dismiss}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
      />

      {/* bottom sheet */}
      <div
        className="relative w-full sm:max-w-md mx-auto bg-white rounded-t-3xl sm:rounded-3xl sm:mb-6 px-6 pt-7 shadow-[0_-12px_40px_-8px_rgba(0,0,0,0.25)] border border-[var(--border)]"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="안내 닫기"
          data-event="cta_inapp_notice_dismiss"
          className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-soft)]"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] text-white shadow-[0_10px_24px_-12px_rgba(37,99,235,0.55)]">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a3 3 0 110 6 3 3 0 010-6zm0 14a8 8 0 01-6.4-3.2c.5-2.4 4.3-3.6 6.4-3.6s5.9 1.2 6.4 3.6A8 8 0 0112 20z" />
          </svg>
        </div>

        <h2
          id="iab-title"
          className="mt-4 text-[19px] sm:text-[20px] font-extrabold tracking-tight text-[var(--primary)] leading-snug"
        >
          외부 브라우저에서 더 편하게 볼 수 있어요
        </h2>

        <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--text-soft)]">
          현재 앱 안에서 페이지가 열려 글자 크기나 화면 비율이 다르게 보일 수 있습니다. 정확한 화면으로 보려면 Safari, Chrome 같은 외부 브라우저에서 열어주세요.
        </p>

        <button
          type="button"
          onClick={onCopy}
          aria-live="polite"
          data-event="cta_inapp_notice_copy"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#3b82f6,#2563eb_55%,#1d4ed8)] px-5 text-[15.5px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(37,99,235,0.55)] hover:brightness-[1.05] active:brightness-95 transition"
        >
          {copied ? (
            <>
              <Check /> 주소가 복사되었습니다
            </>
          ) : (
            <>
              <CopyIcon /> 주소 복사하기
            </>
          )}
        </button>

        <p className="mt-3 text-center text-[12.5px] text-[var(--text-muted)] leading-relaxed">
          복사 후 Safari 또는 Chrome 주소창에 붙여넣어 주세요.
        </p>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M7 3h7a1 1 0 011 1v1h1a1 1 0 011 1v10a1 1 0 01-1 1H9a1 1 0 01-1-1v-1H7a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v9h1V6h6V5H8zm3 2v9h7V7h-7z" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d="M16.704 5.296a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.414L8.5 12.09l6.793-6.793a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
