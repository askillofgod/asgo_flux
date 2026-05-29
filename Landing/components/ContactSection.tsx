"use client";

import { useMemo, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
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
    <section id="contact" className="relative overflow-hidden bg-[var(--bg-soft)] py-24 sm:py-28 md:py-32">
      {/* 배경 글로우 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] -z-0"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 0%, rgba(37,99,235,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="CONTACT"
          title="무료 상담 신청"
          description="아래 폼으로 신청해 주세요. 평일 기준 30분 내 답변드립니다. 더 빠른 상담이 필요하면 카카오톡으로 문의해 주세요."
        />

        {/* 카카오톡 강조 CTA — 글로우 제거, 플랫 */}
        <a
          href={SITE.contact.kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-event="cta_contact_kakao_hero_click"
          className="mt-10 group relative flex items-center gap-4 rounded-3xl bg-[var(--kakao)] px-6 py-5 sm:px-7 sm:py-6 hover:brightness-95 transition"
        >
          <span className="inline-flex h-12 w-12 sm:h-14 sm:w-14 flex-none items-center justify-center rounded-2xl bg-[#181600]/10">
            <KakaoGlyph className="h-6 w-6 sm:h-7 sm:w-7 text-[#181600]" />
          </span>
          <span className="flex flex-col">
            <span className="text-[12px] sm:text-[13px] font-bold tracking-wider uppercase text-[#181600]/65">
              가장 빠른 답변
            </span>
            <span className="text-[18px] sm:text-[22px] font-black text-[#181600] leading-tight">
              카카오톡으로 바로 상담하기
            </span>
          </span>
          <span className="ml-auto hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#181600]/10 text-[#181600] group-hover:translate-x-1 transition-transform">
            <ArrowRight />
          </span>
        </a>

        {/* 전화 강조 CTA — 카카오와 같은 위계, 블루 그라데이션 */}
        <a
          href={`tel:${SITE.contact.phoneTel}`}
          data-event="cta_contact_phone_hero_click"
          className="mt-3 group relative flex items-center gap-4 rounded-3xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] px-6 py-5 sm:px-7 sm:py-6 hover:brightness-[1.05] active:brightness-95 transition"
        >
          <span className="inline-flex h-12 w-12 sm:h-14 sm:w-14 flex-none items-center justify-center rounded-2xl bg-white/15">
            <PhoneGlyph className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
          </span>
          <span className="flex flex-col">
            <span className="text-[12px] sm:text-[13px] font-bold tracking-wider uppercase text-white/75">
              바로 통화
            </span>
            <span className="text-[18px] sm:text-[22px] font-black text-white leading-tight">
              전화로 상담하기
            </span>
            <span className="mt-0.5 text-[12.5px] sm:text-[13px] font-semibold text-white/85">
              {SITE.contact.phone}
            </span>
          </span>
          <span className="ml-auto hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white group-hover:translate-x-1 transition-transform">
            <ArrowRight />
          </span>
        </a>

        {/* 이메일 — 보조 카드 */}
        <div className="mt-3">
          <ChannelCard
            href={`mailto:${SITE.contact.email}`}
            event="cta_contact_email_click"
            label="이메일"
            value={SITE.contact.email}
            tint="navy"
            icon={<MailGlyph />}
          />
        </div>

        {/* 폼 */}
        <form
          className="mt-10 rounded-[28px] border border-[var(--border)] bg-white p-6 sm:p-9 shadow-[var(--shadow-soft)] grid gap-5"
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
              className="input-base"
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
              className="input-base"
              style={{ minHeight: 140 }}
            />
          </Field>

          {validationError && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-700 border border-red-100"
            >
              {validationError}
            </p>
          )}
          {status === "success" && (
            <p
              role="status"
              className="rounded-xl bg-emerald-50 px-4 py-3 text-[14px] font-semibold text-emerald-700 border border-emerald-100"
            >
              상담 신청이 접수되었습니다. 빠르게 연락드리겠습니다.
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-700 border border-red-100"
            >
              접수 중 오류가 발생했습니다. 카카오톡 또는 전화로 문의해 주세요.
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            data-event="cta_contact_form_submit"
            className="inline-flex h-14 sm:h-[60px] w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] px-7 text-button text-white shadow-[var(--shadow-glow)] transition-all hover:shadow-[var(--shadow-glow-strong)] hover:brightness-[1.05] active:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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
            <a
              href={SITE.contact.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-event="cta_contact_kakao_form_click"
              className="inline-flex h-12 sm:h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--kakao)] px-5 text-[15px] font-bold text-[var(--kakao-text)] hover:brightness-95 transition-all shadow-[0_8px_22px_-12px_rgba(254,229,0,0.65)]"
            >
              <KakaoGlyph className="h-5 w-5" /> 카카오톡 문의
            </a>
            <a
              href={mailtoHref}
              data-event="cta_contact_email_form_click"
              className="inline-flex h-12 sm:h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-[15px] font-bold text-[var(--primary)] border border-[var(--border-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <MailGlyph className="h-5 w-5" /> 이메일로 보내기
            </a>
          </div>

          <p className="text-[12.5px] text-[var(--text-muted)] leading-relaxed">
            * 이름·연락처는 필수입니다. 입력하신 정보는 상담 회신 목적으로만 사용되며, 외부에 공유되지 않습니다.
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
      <span className="mb-2 block text-[13.5px] font-bold tracking-tight text-[var(--primary)]">
        {label}
        {required && <span className="ml-1 text-[var(--accent)]">*</span>}
      </span>
      {children}
    </label>
  );
}

function ChannelCard({
  href,
  event,
  label,
  value,
  icon,
  tint,
}: {
  href: string;
  event: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  tint: "kakao" | "blue" | "navy";
}) {
  const palette: Record<typeof tint, string> = {
    kakao: "bg-[#fff9c4] text-[#181600] border-[#f1d44b]/50",
    blue: "bg-gradient-to-br from-[var(--accent)]/12 to-[var(--accent-cyan)]/12 text-[var(--accent)] border-[var(--accent)]/20",
    navy: "bg-[var(--primary)]/[0.08] text-[var(--primary)] border-[var(--primary)]/15",
  };
  const isHttp = href.startsWith("http");
  return (
    <a
      href={href}
      data-event={event}
      target={isHttp ? "_blank" : undefined}
      rel={isHttp ? "noopener noreferrer" : undefined}
      className="card-hover flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-white p-4 sm:p-5"
    >
      <span
        className={`inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl border ${palette[tint]}`}
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[11.5px] font-bold tracking-wider uppercase text-[var(--text-muted)]">
          {label}
        </span>
        <span className="truncate text-[15px] font-bold text-[var(--primary)]">
          {value}
        </span>
      </span>
    </a>
  );
}

function KakaoGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-5 w-5"} aria-hidden="true">
      <path d="M12 3C6.477 3 2 6.477 2 10.77c0 2.77 1.86 5.197 4.66 6.57-.21.73-.76 2.69-.87 3.12-.14.53.19.52.4.38.17-.11 2.66-1.8 3.73-2.52.68.1 1.38.15 2.08.15 5.523 0 10-3.477 10-7.7C22 6.477 17.523 3 12 3z" />
    </svg>
  );
}

function PhoneGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-5 w-5"} aria-hidden="true">
      <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .5 1 1V20c0 .6-.4 1-1 1A18 18 0 013 4c0-.6.4-1 1-1h3.5c.5 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
    </svg>
  );
}

function MailGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-5 w-5"} aria-hidden="true">
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
