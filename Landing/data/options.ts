export type AddonOption = {
  name: string;
  price: string;
  /** 당근 첫 광고 이벤트가 (정가의 약 50%) */
  eventPrice?: string;
  description?: string;
};

export const OPTIONS: AddonOption[] = [
  { name: "로고 제작",              price: "20만 원~", eventPrice: "10만 원~", description: "심플 로고타입부터 시그니처까지" },
  { name: "상세페이지 추가",         price: "30만 원~", eventPrice: "15만 원~", description: "상품 판매·소개용 롱폼 페이지" },
  { name: "서브페이지 추가",         price: "15만 원~", eventPrice: "8만 원~",  description: "회사 소개·서비스·문의 등" },
  { name: "사진 보정 / 이미지 제작", price: "10만 원~", eventPrice: "5만 원~",  description: "제품·매장 사진 보정 및 가공" },
  { name: "블로그 / SEO 글 작성",    price: "10만 원~", eventPrice: "5만 원~",  description: "검색 노출용 콘텐츠 작성" },
  { name: "유지보수 월 관리",        price: "10만 원~", eventPrice: "5만 원~",  description: "수정·관리·백업 월 단위 관리" },
];
