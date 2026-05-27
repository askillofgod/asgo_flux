import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * 브라우저용 Supabase 클라이언트.
 *
 * 환경변수는 빌드 타임에 정적 export 번들에 인라인된다.
 * Cloudflare Pages 빌드 환경에 아래 두 값이 설정돼 있어야 한다:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase: SupabaseClient | null =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: false },
      })
    : null;

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

export async function insertInquiry(payload: InquiryPayload): Promise<void> {
  if (!supabase) {
    throw new Error("supabase_client_not_initialized");
  }
  const { error } = await supabase.from("inquiries").insert(payload);
  if (error) {
    throw error;
  }
}
