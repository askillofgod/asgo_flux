"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 인앱브라우저 안내 — 하단 떠 있는 카드형 팝업.
 *  - 화면 전체를 덮지 않음. 좌우 16px 여백 + max-w-[420px]
 *  - 모바일에선 sticky CTA 위로 92px 띄움
 *  - 배경 dim 약하게 (bg-black/35), backdrop-blur 없음
 *  - Android: intent://... ;package=com.android.chrome
 *  - iOS:     googlechromes://...  (Chrome URL Scheme)
 *  - 실패 시 주소 복사 폴백
 */

const PATTERNS: RegExp[] = [
  /KakaoTalk/i,
  /Daangn/i,
  /Karrot/i,
  /Instagram/i,
  /FBAN|FBAV/,
  /Line\//,
  /NAVER/,
  /Twitter/i,
  /; wv\)/,
  /WebView/i,
];

const STORAGE_KEY = "asog:inapp-notice-dismissed";

type OpenState = "idle" | "opening";
type CopyState = "idle" | "copied" | "error";
type OS = "android" | "ios" | "other";

function isInAppBrowser(ua: string): boolean {
  return PATTERNS.some((p) => p.test(ua));
}

function detectOS(ua: string): OS {
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  return "other";
}

function toIOSChromeUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    if (url.protocol === "https:") {
      return `googlechromes://${url.host}${url.pathname}${url.search}${url.hash}`;
    }
    if (url.protocol === "http:") {
      return `googlechrome://${url.host}${url.pathname}${url.search}${url.hash}`;
    }
    return rawUrl;
  } catch {
    return rawUrl;
  }
}

async function copyUrlToClipboard(): Promise<boolean> {
  const url = window.location.href;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return true;
    }
  } catch {
    /* fallback */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = url;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch (e) {
    console.error("[InAppBrowserNotice] copy failed:", e);
    return false;
  }
}

export default function InAppBrowserNotice() {
  const [visible, setVisible] = useState(false);
  const [openState, setOpenState] = useState<OpenState>("idle");
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [openFailed, setOpenFailed] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* storage disabled */
    }
    const ua = window.navigator?.userAgent ?? "";
    if (isInAppBrowser(ua)) setVisible(true);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current != null) window.clearTimeout(timerRef.current);
    };
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

  const tryOpenWithVisibilityCheck = (urlScheme: string, timeoutMs: number) => {
    let didLeave = false;
    const onVis = () => {
      if (document.visibilityState === "hidden") didLeave = true;
    };
    document.addEventListener("visibilitychange", onVis);

    try {
      window.location.href = urlScheme;
    } catch (e) {
      console.error("[InAppBrowserNotice] navigation failed:", e);
    }

    timerRef.current = window.setTimeout(() => {
      document.removeEventListener("visibilitychange", onVis);
      const stillVisible =
        !didLeave && document.visibilityState !== "hidden";
      setOpenState("idle");
      if (stillVisible) setOpenFailed(true);
    }, timeoutMs);
  };

  const openExternal = () => {
    if (openState === "opening") return;
    setOpenState("opening");
    setOpenFailed(false);

    const ua = navigator.userAgent;
    const detected: OS = detectOS(ua);

    if (detected === "android") {
      try {
        const u = new URL(window.location.href);
        const scheme = u.protocol.replace(":", "");
        const intentUrl = `intent://${u.host}${u.pathname}${u.search}${u.hash}#Intent;scheme=${scheme};package=com.android.chrome;end`;
        tryOpenWithVisibilityCheck(intentUrl, 1600);
      } catch (e) {
        console.error("[InAppBrowserNotice] intent build failed:", e);
        setOpenState("idle");
        setOpenFailed(true);
      }
      return;
    }

    if (detected === "ios") {
      const chromeUrl = toIOSChromeUrl(window.location.href);
      tryOpenWithVisibilityCheck(chromeUrl, 1500);
      return;
    }

    setOpenState("idle");
  };

  const copyUrl = async () => {
    const ok = await copyUrlToClipboard();
    setCopyState(ok ? "copied" : "error");
    if (ok) setOpenFailed(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="iab-title"
      className="fixed inset-0 z-[60]"
    >
      {/* dim — 뒤 콘텐츠가 보이도록 약하게 */}
      <button
        type="button"
        aria-label="닫기"
        onClick={dismiss}
        className="absolute inset-0 bg-black/35"
      />

      {/* 하단 떠 있는 컴팩트 카드 — sticky CTA 위로 띄움 */}
      <div
        className="absolute inset-x-0 px-4 md:bottom-8"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 92px)" }}
      >
        <div className="relative mx-auto max-w-[420px] rounded-[22px] bg-white shadow-2xl px-5 py-4 text-center">
          <button
            type="button"
            onClick={dismiss}
            aria-label="안내 닫기"
            data-event="cta_inapp_notice_dismiss"
            className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-soft)]"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <h2
            id="iab-title"
            className="text-[16px] font-extrabold tracking-tight text-[var(--primary)]"
          >
            더 편하게 보기
          </h2>

          <p className="mt-1 text-[13px] leading-snug text-[var(--text-soft)]">
            외부 브라우저로 보면 화면이 더 정확해요.
          </p>

          <button
            type="button"
            onClick={openExternal}
            disabled={openState === "opening"}
            data-event="cta_inapp_notice_open_external"
            className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#3b82f6,#2563eb_55%,#1d4ed8)] px-5 text-[14px] font-bold text-white shadow-[0_10px_22px_-12px_rgba(37,99,235,0.55)] hover:brightness-[1.05] active:brightness-95 disabled:opacity-70 disabled:cursor-progress transition"
          >
            {openState === "opening" ? <Spinner /> : <ExternalIcon />}
            {openState === "opening" ? "여는 중..." : "외부 브라우저 열기"}
          </button>

          <button
            type="button"
            onClick={copyUrl}
            aria-live="polite"
            data-event="cta_inapp_notice_copy"
            className={[
              "mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-[14px] font-bold transition-colors",
              openFailed && copyState !== "copied"
                ? "border border-[var(--accent)] text-[var(--accent)] shadow-[0_0_0_3px_rgba(37,99,235,0.12)]"
                : "border border-[var(--border-strong)] text-[var(--primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
            ].join(" ")}
          >
            {copyState === "copied" ? <Check /> : <CopyIcon />}
            {copyState === "copied"
              ? "주소가 복사되었습니다"
              : copyState === "error"
              ? "복사 실패"
              : "주소 복사하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M13 3a1 1 0 100 2h1.586l-5.293 5.293a1 1 0 101.414 1.414L16 6.414V8a1 1 0 102 0V4a1 1 0 00-1-1h-4zM4 5a1 1 0 011-1h3a1 1 0 110 2H6v8h8v-2a1 1 0 112 0v3a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
    </svg>
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

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 animate-spin">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" />
      <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" />
    </svg>
  );
}
