export type Portfolio = {
  category: string;
  title: string;
  description: string;
};

export const PORTFOLIO: Portfolio[] = [
  { category: "병원·의료", title: "OO 한의원 원페이지", description: "내원 유도 중심의 모바일 랜딩" },
  { category: "F&B", title: "OO 베이커리 브랜드 사이트", description: "메뉴/매장/예약 페이지 구성" },
  { category: "공방·스튜디오", title: "OO 공방 클래스 페이지", description: "수강 신청·일정 안내 중심" },
  { category: "스타트업", title: "OO 서비스 광고 랜딩", description: "당근·인스타 광고 전환용 페이지" },
  { category: "교육·학원", title: "OO 학원 회사 소개", description: "강사·커리큘럼·상담 페이지" },
  { category: "뷰티·미용", title: "OO 살롱 예약 페이지", description: "메뉴·시술·예약 흐름 설계" },
];

export const CAREER = [
  { label: "누적 제작", value: "120건+" },
  { label: "평균 제작 기간", value: "2주" },
  { label: "재의뢰율", value: "37%" },
  { label: "평균 만족도", value: "4.8 / 5.0" },
];
