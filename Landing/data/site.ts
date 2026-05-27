/**
 * 사이트 전역 설정.
 * 가격/문구 변경 시 가장 먼저 수정하는 파일.
 */
export const SITE = {
  name: "ASOG 정찰제 홈페이지 제작소",
  brandShort: "ASOG",

  metaTitle: "정찰제 홈페이지 제작 | 소상공인·자영업자 홈페이지 제작",
  metaDescription:
    "소상공인과 자영업자를 위한 정찰제 홈페이지 제작 서비스. 원페이지 홈페이지, 기본형 홈페이지, 광고 랜딩페이지를 명확한 가격으로 제작합니다.",
  keywords: [
    "홈페이지 제작",
    "소상공인 홈페이지 제작",
    "자영업자 홈페이지 제작",
    "정찰제 홈페이지 제작",
    "원페이지 홈페이지 제작",
    "랜딩페이지 제작",
    "광고용 랜딩페이지",
  ],

  hero: {
    headline: "홈페이지 제작, 얼마인지\n먼저 알려드립니다.",
    sub:
      "소상공인·자영업자·1인사업자를 위한 정찰제 홈페이지 제작 서비스입니다. 복잡한 견적 없이 필요한 구성만 빠르게 제작합니다.",
    badge: "정찰제 · 빠른 제작 · 모바일 최적화",
  },

  contact: {
    kakaoUrl: "https://pf.kakao.com/_rVGxjX/chat",
    email: "xxxaskillofgodxxx@gmail.com",
    phone: "010-2835-5878",
    phoneTel: "010-2835-5878",
  },

  cta: {
    primary: "무료 상담 신청하기",
    secondary: "가격표 보기",
    kakao: "카카오톡 문의하기",
  },
} as const;

export type SiteConfig = typeof SITE;
