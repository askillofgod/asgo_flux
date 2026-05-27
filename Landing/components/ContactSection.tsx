"use client";

import { useMemo, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import CTAButton from "./ui/CTAButton";
import { SITE } from "@/data/site";
import { PRICING } from "@/data/pricing";
import { insertInquiry } from "@/lib/supabase";

const PRODUCT_OPTIONS = [
  ...PRICING.map((p) => p.name),
  "아직 모르겠음",
];

type FormState = {
  name: string;
  phone: string;
  company: string;
  industry: string;
  product: string;
  reference_url: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  company: "",
  industry: "",
  product: "",
  reference_url: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handle =
    <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const mailtoHref = useMemo(() => {
    const subject = `[홈페이지 제작 문의] ${form.company || form.name || "신규 문의"}`;
    const body = [
      `이름: ${form.name}`,
      `연락처: ${form.phone}`,
      `업체명: ${form.company}`,
      `업종: ${form.industry}`,
      `원하는 제작 상품: ${form.product}`,
      `참고 사이트: ${form.reference_url}`,
      "",
      "문의 내용:",
      form.message,
    ].join("\n");
    return `mailto:${SITE.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [form]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const name = form.name.trim();
    const phone = form.phone.trim();
    if (!name || !phone) {
      setValidationError("이름과 연락처는 필수 입력 항목입니다.");
      setStatus("idle");
      return;
    }
    setValidationError(null);
    setStatus("submitting");

    try {
      await insertInquiry({
        name,
        phone,
        company: form.company.trim() || null,
        industry: form.industry.trim() || null,
        product: form.product || null,
        reference_url: form.reference_url.trim() || null,
        message: form.message.trim() || null,
        page_url: typeof window !== "undefined" ? window.location.href : "",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      });
      setForm(EMPTY_FORM);
      setStatus("success");
    } catch (err) {
      console.error("[inquiries] insert failed:", err);
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <section id="contact" className="bg-[var(--bg-soft)] py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="CONTACT"
          title="무료 상담 신청"
          description="아래 폼으로 신청해 주세요. 보통 30분 내 답변드립니다. 더 빠른 상담이 필요하면 카카오톡으로도 문의 가능합니다."
        />

        {/* 연락 채널 카드 */}
        <div className="mt-10 grid gap-3 sm:gap-4 sm:grid-cols-3">
          <ChannelCard
            href={SITE.contact.kakaoUrl}
            external
            label="카카오톡 상담"
            value="가장 빠른 답변"
            tint="kakao"
            icon={<KakaoGlyph />}
          />
          <ChannelCard
            href={`tel:${SITE.contact.phoneTel}`}
            label="전화 문의"
            value={SITE.contact.phone}
            tint="blue"
            icon={<PhoneGlyph />}
          />
          <ChannelCard
            href={`mailto:${SITE.contact.email}`}
            label="이메일"
            value={SITE.contact.email}
            tint="navy"
            icon={<MailGlyph />}
          />
        </div>

        <form
          className="mt-8 sm:mt-10 rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-8 shadow-[var(--shadow-soft)] grid gap-5"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="이름" required>
              <input
                value={form.name}
                onChange={handle("name")}
                placeholder="홍길동"
                className="input-base"
                autoComplete="name"
                required
              />
            </Field>
            <Field label="연락처" required>
              <input
                value={form.phone}
                onChange={handle("phone")}
                placeholder="010-0000-0000"
                className="input-base"
                inputMode="tel"
                autoComplete="tel"
                required
              />
            </Field>
            <Field label="업체명">
              <input
                value={form.company}
                onChange={handle("company")}
                placeholder="예) 길동 베이커리"
                className="input-base"
              />
            </Field>
            <Field label="업종">
              <input
                value={form.industry}
                onChange={handle("industry")}
                placeholder="예) 베이커리, 미용실, 학원"
                className="input-base"
              />
            </Field>
          </div>

          <Field label="원하는 제작 상품">
            <select
              value={form.product}
              onChange={handle("product")}
              className="input-base appearance-none bg-white pr-10"
            >
              <option value="">선택해 주세요</option>
              {PRODUCT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>

          <Field label="참고 사이트">
            <input
              value={form.reference_url}
              onChange={handle("reference_url")}
              placeholder="마음에 드는 사이트 주소가 있다면 알려주세요"
              className="input-base"
              inputMode="url"
            />
          </Field>

          <Field label="문의 내용">
            <textarea
              value={form.message}
              onChange={handle("message")}
              placeholder="어떤 홈페이지가 필요하신지 자유롭게 적어주세요."
              rows={5}
              className="input-base min-h-[140px] resize-y"
            />
          </Field>

          {validationError && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 border border-red-100"
            >
              {validationError}
            </p>
          )}
          {status === "success" && (
            <p
              role="status"
              className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 border border-emerald-100"
            >
              상담 신청이 접수되었습니다. 빠르게 연락드리겠습니다.
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 border border-red-100"
            >
              접수 중 오류가 발생했습니다. 카카오톡 또는 전화로 문의해 주세요.
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] px-7 text-[17px] font-semibold text-white shadow-[0_12px_32px_-12px_rgba(37,99,235,0.6)] transition-all hover:shadow-[0_18px_40px_-12px_rgba(37,99,235,0.75)] hover:brightness-[1.05] active:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner /> 접수 중...
              </>
            ) : (
              <>
                {SITE.cta.primary}
                <ArrowRight />
              </>
            )}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CTAButton
              href={SITE.contact.kakaoUrl}
              variant="kakao"
              size="md"
              external
              className="w-full"
              ariaLabel="카카오톡으로 상담하기"
            >
              <KakaoGlyph /> 카카오톡 문의
            </CTAButton>
            <CTAButton
              href={mailtoHref}
              variant="secondary"
              size="md"
              external
              className="w-full"
              ariaLabel="이메일로 문의 내용 보내기"
            >
              <MailGlyph /> 이메일로 보내기
            </CTAButton>
          </div>

          <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">
            * 이름·연락처는 필수입니다. 입력하신 정보는 상담 회신 목적으로만 사용됩니다.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-bold tracking-tight text-[var(--primary)]">
        {label}
        {required && <span className="ml-1 text-[var(--accent)]">*</span>}
      </span>
      {children}
    </label>
  );
}

function ChannelCard({
  href,
  external,
  label,
  value,
  icon,
  tint,
}: {
  href: string;
  external?: boolean;
  label: string;
  value: string;
  icon: React.ReactNode;
  tint: "kakao" | "blue" | "navy";
}) {
  const palette: Record<typeof tint, string> = {
    kakao: "bg-[#fff9c4] text-[#181600] border-[#f1d44b]/50",
    blue: "bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-cyan)]/10 text-[var(--accent)] border-[var(--accent)]/15",
    navy: "bg-[var(--primary)]/[0.06] text-[var(--primary)] border-[var(--primary)]/15",
  };
  const isHttp = href.startsWith("http");
  const Tag = isHttp ? "a" : "a";
  const props = isHttp
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };
  void external;
  return (
    <Tag
      {...props}
      className="card-hover flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 sm:p-5"
    >
      <span
        className={`inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl border ${palette[tint]}`}
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[11.5px] font-semibold tracking-wider uppercase text-[var(--text-muted)]">
          {label}
        </span>
        <span className="truncate text-[14px] font-bold text-[var(--primary)]">
          {value}
        </span>
      </span>
    </Tag>
  );
}

function KakaoGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3C6.477 3 2 6.477 2 10.77c0 2.77 1.86 5.197 4.66 6.57-.21.73-.76 2.69-.87 3.12-.14.53.19.52.4.38.17-.11 2.66-1.8 3.73-2.52.68.1 1.38.15 2.08.15 5.523 0 10-3.477 10-7.7C22 6.477 17.523 3 12 3z" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .5 1 1V20c0 .6-.4 1-1 1A18 18 0 013 4c0-.6.4-1 1-1h3.5c.5 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 8.4L4.2 7.2H3v.6l9 7.2 9-7.2v-.6h-1.2L12 13.4z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d="M10.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
