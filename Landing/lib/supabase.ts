import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * 브라우저용 Supabase 클라이언트.
 *
 * 문의는 asog-studio 프로젝트의 `inquiries` 표로 들어간다. 공식 사이트(asog)와
 * 같은 곳이라 스튜디오 "사이트 문의" 탭에서 보이고, 들어오면 메일 알림도 간다.
 *
 * 주소와 키는 공개용(publishable)이라 코드에 둔다. 이 키로 할 수 있는 일은
 * `inquiry_add` 호출뿐이고, 표를 직접 읽거나 고칠 수는 없다.
 * 예전 Cloudflare 환경변수(NEXT_PUBLIC_SUPABASE_*)는 사라진 프로젝트를 가리키므로
 * 읽지 않는다.
 */
const SUPABASE_URL = "https://qtiazentdzwzkgrsjbob.supabase.co";
const SUPABASE_KEY = "sb_publishable_bKsdXn04F_MCXT9YgCiYZg_biJjPRZC";

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

export type InquiryPayload = {
  name: string;
  phone: string;
  company: string | null;
  industry: string | null;
  product: string | null;
  reference_url: string | null;
  message: string | null;
  page_url: string;
  user_agent: string;
};

/** 스튜디오 문의 카드에서 랜딩 문의임을 알아보게 붙이는 꼬리표 */
const SOURCE_TAG = "웹클리닉 랜딩";

/**
 * 랜딩 폼 항목을 공식 사이트 문의 형식(q1·need·tel …)에 맞춰 보낸다.
 * 업종·참고 사이트는 따로 칸이 없어 문의 내용 아래에 붙인다.
 */
export async function insertInquiry(payload: InquiryPayload): Promise<void> {
  const extra = [
    payload.industry && `업종: ${payload.industry}`,
    payload.reference_url && `참고 사이트: ${payload.reference_url}`,
  ].filter(Boolean);
  const body = (payload.message || "(문의 내용 없음)").slice(0, 3500);
  const q1 = extra.length ? `${body}\n\n${extra.join("\n")}` : body;

  const { error } = await supabase.rpc("inquiry_add", {
    p: {
      q1,
      name: payload.name,
      tel: payload.phone,
      company: payload.company,
      need: [SOURCE_TAG, ...(payload.product ? [payload.product] : [])],
      page: payload.page_url,
    },
  });
  if (error) {
    throw error;
  }
}
