"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 인앱브라우저(카카오톡/당근/인스타/페북 등)에서 페이지가 열렸을 때
 * 외부 브라우저로 열도록 안내하는 bottom sheet 팝업.
 *
 * 버튼 2개:
 *  1) 외부 브라우저 열기  — Android intent / iOS window.open 시도
 *  2) 주소 복사하기       — navigator.clipboard (+ textarea 폴백)
 *
 * iOS 사용자에게는 OS 정책상 자동 외부 이동이 막힐 수 있어
 * 우측 상단 ⋯ → "Safari에서 열기" 안내 문구를 추가로 노출.
 */

const PATTERNS: RegExp[] = [
  /KakaoTalk/i, // 카카오톡
  /Daangn/i,    // 당근
  /Karrot/i,    // 당근 영문 UA
  /Instagram/i, // 인스타그램
  /FBAN|FBAV/,  // 페이스북
  /Line\//,     // 라인
  /NAVER/,      // 네이버
  /Twitter/i,   // X(트위터)
  /; wv\)/,     // 안드로이드 WebView 마커
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

async function copyUrlToClipboard(): Promise<boolean> {
  const url = window.location.href;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return true;
    }
  } catch {
    /* fall through to legacy */
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
  const [os, setOs] = useState<OS>("other");
  const [openState, setOpenState] = useState<OpenState>("idle");
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const intentTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* storage 비활성 환경 */
    }
    const ua = window.navigator?.userAgent ?? "";
    setOs(detectOS(ua));
    if (isInAppBrowser(ua)) setVisible(true);
  }, []);

  useEffect(() => {
    return () => {
      if (intentTimerRef.current != null) {
        window.clearTimeout(intentTimerRef.current);
      }
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

  const openExternal = () => {
    if (openState === "opening") return;
    setOpenState("opening");

    const ua = navigator.userAgent;
    const detected: OS = detectOS(ua);

    if (detected === "android") {
      let didLeave = false;
      const onVis = () => {
        if (document.visibilityState === "hidden") didLeave = true;
      };
      document.addEventListener("visibilitychange", onVis);

      try {
        const u = new URL(window.location.href);
        const scheme = u.protocol.replace(":", "");
        const intentUrl = `intent://${u.host}${u.pathname}${u.search}${u.hash}#Intent;scheme=${scheme};package=com.android.chrome;end`;
        window.location.href = intentUrl;
      } catch (e) {
        console.error("[InAppBrowserNotice] intent failed:", e);
      }

      intentTimerRef.current = window.setTimeout(() => {
        document.removeEventListener("visibilitychange", onVis);
        // 페이지를 벗어났든 안 벗어났든, 버튼 상태는 idle 로 복귀
        // (실패 케이스에서 사용자가 "주소 복사하기" 버튼을 누를 수 있도록)
        setOpenState("idle");
        void didLeave;
      }, 1600);
      return;
    }

    if (detected === "ios") {
      try {
        const opened = window.open(
          window.location.href,
          "_blank",
          "noopener,noreferrer"
        );
        // 결과와 무관하게 잠시 후 idle 로 복귀.
        // (iOS 는 결과 신뢰도가 낮아 visibilitychange 검사도 의미가 적음)
        intentTimerRef.current = window.setTimeout(() => {
          setOpenState("idle");
        }, 1200);
        void opened;
      } catch (e) {
        console.error("[InAppBrowserNotice] window.open failed:", e);
        setOpenState("idle");
      }
      return;
    }

    // 기타 환경 — 곧장 idle 복귀
    setOpenState("idle");
  };

  const copyUrl = async () => {
    const ok = await copyUrlToClipboard();
    setCopyState(ok ? "copied" : "error");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="iab-title"
      className="fixed inset-0 z-[60] flex items-end justify-center"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={dismiss}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
      />

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
            <path d="M14 3a1 1 0 100 2h3.586l-9.293 9.293a1 1 0 101.414 1.414L19 6.414V10a1 1 0 102 0V4a1 1 0 00-1-1h-6zM5 5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5a1 1 0 10-2 0v5H5V7h5a1 1 0 100-2H5z" />
          </svg>
        </div>

        <h2
          id="iab-title"
          className="mt-4 text-[19px] sm:text-[20px] font-extrabold tracking-tight text-[var(--primary)] leading-snug"
        >
          외부 브라우저에서 열어주세요
        </h2>

        <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--text-soft)]">
          현재 앱 안에서 페이지가 열려 글자 크기나 화면 비율이 다르게 보일 수 있습니다. 정확한 화면으로 보려면 아래 버튼으로 외부 브라우저에서 열어주세요.
        </p>

        {os === "ios" && (
          <div
            role="note"
            className="mt-4 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/[0.06] px-4 py-3"
          >
            <p className="flex items-center gap-1.5 text-[12.5px] font-bold tracking-wide text-[var(--accent-strong)] uppercase">
              <InfoIcon />
              iPhone 사용자
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--text-soft)]">
              iPhone에서는 외부 브라우저가 자동으로 열리지 않을 수 있습니다. 우측 상단 <span className="inline-block px-1 font-bold">⋯</span> 또는 공유 버튼을 누른 뒤 <strong className="font-bold">“Safari에서 열기”</strong>를 선택해 주세요.
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-muted)]">
              열리지 않으면 아래 <strong className="font-semibold">주소 복사하기</strong>를 눌러 Safari/Chrome 주소창에 붙여넣어 주세요.
            </p>
          </div>
        )}

        {/* Primary — 외부 브라우저 열기 */}
        <button
          type="button"
          onClick={openExternal}
          disabled={openState === "opening"}
          data-event="cta_inapp_notice_open_external"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#3b82f6,#2563eb_55%,#1d4ed8)] px-5 text-[15.5px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(37,99,235,0.55)] hover:brightness-[1.05] active:brightness-95 disabled:opacity-70 disabled:cursor-progress transition"
        >
          {openState === "opening" ? <Spinner /> : <ExternalIcon />}
          {openState === "opening" ? "외부 브라우저 여는 중..." : "외부 브라우저 열기"}
        </button>

        {/* Secondary — 주소 복사하기 */}
        <button
          type="button"
          onClick={copyUrl}
          aria-live="polite"
          data-event="cta_inapp_notice_copy"
          className="mt-2.5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-[15px] font-bold text-[var(--primary)] border border-[var(--border-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
        >
          {copyState === "copied" ? <Check /> : <CopyIcon />}
          {copyState === "copied"
            ? "주소가 복사되었습니다"
            : copyState === "error"
            ? "복사 실패 — 다시 시도"
            : "주소 복사하기"}
        </button>

        <p className="mt-3 text-center text-[12px] text-[var(--text-muted)] leading-relaxed">
          {copyState === "copied"
            ? "Safari 또는 Chrome 주소창에 붙여넣어 주세요."
            : "열리지 않으면 주소 복사하기를 사용해 주세요."}
        </p>
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

function InfoIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 6h2v2H9V6zm0 4h2v6H9v-6z" />
    </svg>
  );
}
