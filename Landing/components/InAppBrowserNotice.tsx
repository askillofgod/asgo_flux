"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 인앱브라우저(카카오톡/당근/인스타/페북 등)에서 페이지가 열렸을 때
 * 외부 브라우저로 열도록 안내하는 bottom sheet 팝업.
 *
 * 우선 외부 브라우저 열기를 시도하고, 실패하면 주소 복사 폴백으로 동작.
 *
 * - User-Agent 기반 감지 (보수적: 명확한 인앱 시그니처만 매칭)
 * - sessionStorage 로 같은 세션 동안 재노출 방지
 * - SSR 안전: window/navigator 접근은 useEffect/이벤트 핸들러 안
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

type ButtonState = "idle" | "opening" | "copied" | "error";

function isInAppBrowser(ua: string): boolean {
  return PATTERNS.some((p) => p.test(ua));
}

function detectOS(ua: string): "android" | "ios" | "other" {
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
  const [state, setState] = useState<ButtonState>("idle");
  const intentTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* storage 비활성 환경 */
    }
    const ua = window.navigator?.userAgent ?? "";
    if (isInAppBrowser(ua)) setVisible(true);
  }, []);

  // 정리
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

  const fallbackToCopy = async () => {
    const ok = await copyUrlToClipboard();
    setState(ok ? "copied" : "error");
  };

  const openExternal = async () => {
    if (state === "opening") return;
    setState("opening");

    const ua = navigator.userAgent;
    const os = detectOS(ua);

    if (os === "android") {
      // Chrome intent. 성공 시 페이지가 백그라운드로 가서 visibilityState 가 hidden 됨.
      // 일정 시간 이후에도 여전히 visible 이면 실패로 간주하고 복사 폴백.
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

      intentTimerRef.current = window.setTimeout(async () => {
        document.removeEventListener("visibilitychange", onVis);
        if (!didLeave && document.visibilityState !== "hidden") {
          await fallbackToCopy();
        } else {
          // Chrome 으로 빠져나갔거나 빠져나갔다가 돌아옴 — 굳이 복사하지 않음
          setState("idle");
        }
      }, 1600);
      return;
    }

    if (os === "ios") {
      // iOS 는 정책상 외부 Safari 강제 실행이 막혀 있는 경우가 많음.
      // 새 탭 시도 후 실패 시 복사 폴백.
      try {
        const opened = window.open(
          window.location.href,
          "_blank",
          "noopener,noreferrer"
        );
        if (opened) {
          // 시도 자체는 성공 — 다만 인앱 내부에서 새 창이 열렸을 수도 있음.
          // 사용자가 다시 돌아오면 idle 로 두고, 안 돌아오면 어차피 leave 됨.
          setState("idle");
          return;
        }
      } catch (e) {
        console.error("[InAppBrowserNotice] window.open failed:", e);
      }
      await fallbackToCopy();
      return;
    }

    // 그 외 환경 — 곧장 복사
    await fallbackToCopy();
  };

  const buttonLabel =
    state === "copied"
      ? "주소가 복사되었습니다"
      : state === "opening"
      ? "외부 브라우저 여는 중..."
      : "외부 브라우저 열기";

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

        <button
          type="button"
          onClick={openExternal}
          disabled={state === "opening"}
          aria-live="polite"
          data-event="cta_inapp_notice_open_external"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#3b82f6,#2563eb_55%,#1d4ed8)] px-5 text-[15.5px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(37,99,235,0.55)] hover:brightness-[1.05] active:brightness-95 disabled:opacity-70 disabled:cursor-progress transition"
        >
          {state === "copied" ? <Check /> : state === "opening" ? <Spinner /> : <ExternalIcon />}
          {buttonLabel}
        </button>

        <p className="mt-3 text-center text-[12.5px] text-[var(--text-muted)] leading-relaxed">
          {state === "copied"
            ? "Safari 또는 Chrome 주소창에 붙여넣어 주세요."
            : state === "error"
            ? "주소 복사에 실패했어요. 직접 주소창에 입력해 주세요."
            : "열리지 않으면 주소를 복사해 Safari 또는 Chrome 주소창에 붙여넣어 주세요."}
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
