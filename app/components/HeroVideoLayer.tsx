"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "../lib/basePath";

/** 스크롤 구간(뷰포트 높이 비율) 안에서 동영상이 서서히 사라짐 */
const FADE_START = 0.1;  // 이 구간부터 페이드 시작
const FADE_END = 1.5;    // 이 구간에서 완전히 사라짐 (스크롤 거리 길게 = 더 천천히)
/** 이만큼 스크롤 내리면 "터치하여 재생" 오버레이 숨김 (글자와 겹침 방지) */
const TAP_OVERLAY_HIDE_SCROLL = 120;
/** 이 시간 안에 영상이 로드되지 않으면 실패로 간주하고 밝은 배경만 표시 */
const LOAD_TIMEOUT_MS = 8000;

const BG_VIDEOS = [
  asset("/videos/bg1.mp4"),
  asset("/videos/bg2.mp4"),
  asset("/videos/bg3.mp4"),
  asset("/videos/bg4.mp4"),
];

export function HeroVideoLayer() {
  const [videoSrc, setVideoSrc] = useState(BG_VIDEOS[0]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tapToPlay, setTapToPlay] = useState(false); // iOS 등에서 자동재생 막혔을 때 true
  const [loadError, setLoadError] = useState(false); // 비디오 로드 실패 시 검은 화면 대신 배경만 표시

  useEffect(() => {
    setLoadError(false);
    setVideoSrc(BG_VIDEOS[Math.floor(Math.random() * BG_VIDEOS.length)]);
  }, []);

  const onVideoError = () => {
    setLoadError(true); // 로드 실패 시 비디오 숨기고 밝은 배경만 보이게
  };

  // iOS Safari는 사용자 제스처 없이 자동재생을 막음 → 재생 실패 시 탭 오버레이 표시
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setLoadError(false);
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const attemptPlay = () => {
      video.muted = true;
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.catch(() => setTapToPlay(true));
      }
    };
    const onLoaded = () => {
      if (timeoutId) clearTimeout(timeoutId);
      attemptPlay();
    };
    video.addEventListener("loadeddata", onLoaded, { once: true });
    video.addEventListener("error", onVideoError, { once: true });
    attemptPlay();
    timeoutId = setTimeout(() => {
      if (video.readyState < 2) onVideoError();
    }, LOAD_TIMEOUT_MS);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      video.removeEventListener("error", onVideoError);
    };
  }, [videoSrc]);

  const onTapOverlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().then(() => setTapToPlay(false)).catch(() => {});
  };

  const [opacity, setOpacity] = useState(1);
  const [showTapOverlay, setShowTapOverlay] = useState(true); // 스크롤 내리면 오버레이 숨겨 글자와 겹치지 않게

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const start = h * FADE_START;
      const end = h * FADE_END;
      if (y <= start) setOpacity(1);
      else if (y >= end) setOpacity(0);
      else setOpacity(1 - (y - start) / (end - start));
      setShowTapOverlay(y < TAP_OVERLAY_HIDE_SCROLL);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 bg-[#fafaf9] transition-opacity duration-700"
      style={{ opacity }}
      aria-hidden
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        className={`h-full w-full object-cover ${loadError ? "hidden" : ""}`}
        style={{ objectFit: "cover" }}
        onError={onVideoError}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {/* 영상 로드 실패 시 검은 화면 대신 밝은 배경 + 안내 */}
      {loadError && (
        <div className="absolute inset-0 z-[5] flex items-center justify-center bg-[#fafaf9]">
          <p className="text-center text-sm text-black/50">동영상을 불러올 수 없습니다</p>
        </div>
      )}
      {/* iOS 등: 상단에서만 오버레이 표시, 스크롤 내리면 숨겨서 글자와 겹치지 않게 */}
      {tapToPlay && showTapOverlay && (
        <button
          type="button"
          onClick={onTapOverlay}
          onTouchEnd={onTapOverlay}
          className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-[#fafaf9]/90 text-black"
          aria-label="동영상 재생"
        >
          <span className="rounded-full border border-black/20 bg-white/90 px-6 py-3 text-sm">
            화면을 터치하여 재생
          </span>
        </button>
      )}
    </div>
  );
}
