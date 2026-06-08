export type PricingProduct = {
  id: string;
  name: string;
  price: string;
  /** 당근 첫 광고 이벤트 특가. 비어 있으면 정가만 노출 */
  eventPrice?: string;
  /** 이벤트 라벨 (배지) */
  eventLabel?: string;
  priceNote: string;
  tag?: string;
  highlight?: boolean;
  recommendFor: string;
  features: string[];
};

/**
 * 정찰제 상품 + 당근 첫 광고 이벤트가.
 * - price: 정가 (취소선 + 작게 표기)
 * - eventPrice: 이벤트가 (크게 강조)
 */
export const PRICING: PricingProduct[] = [
  {
    id: "onepage",
    name: "원페이지 홈페이지",
    price: "50만 원",
    eventPrice: "5만 원",
    eventLabel: "당근 첫 광고 이벤트가",
    priceNote: "부가세 별도 · 1~2주 제작",
    tag: "가장 인기",
    highlight: true,
    recommendFor: "급하게 홈페이지가 필요한 소상공인",
    features: [
      "원페이지 구성",
      "모바일 반응형",
      "업체 소개",
      "서비스/상품 소개",
      "문의 버튼 연결",
      "기본 SEO 세팅",
    ],
  },
  {
    id: "ad-landing",
    name: "광고 랜딩페이지",
    price: "70만 원",
    eventPrice: "10만 원",
    eventLabel: "당근 첫 광고 이벤트가",
    priceNote: "부가세 별도 · 2주 제작",
    tag: "광고 전환 특화",
    recommendFor: "당근·네이버·인스타 광고용 페이지가 필요한 업체",
    features: [
      "광고용 상세 랜딩페이지",
      "상품/서비스 설명 구조",
      "상담 유도 버튼 반복 배치",
      "모바일 최적화",
      "전환 중심 디자인",
    ],
  },
  {
    id: "basic",
    name: "기본형 홈페이지",
    price: "90만 원",
    eventPrice: "30만 원",
    eventLabel: "당근 첫 광고 이벤트가",
    priceNote: "부가세 별도 · 2~3주 제작",
    tag: "회사 소개 사이트",
    recommendFor: "제대로 된 회사 소개 사이트가 필요한 업체",
    features: [
      "메인 페이지",
      "서브 3페이지",
      "모바일 반응형",
      "회사/업체 소개",
      "서비스 소개",
      "문의 페이지",
      "기본 SEO 세팅",
    ],
  },
];
