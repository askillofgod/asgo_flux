"use client";

import { useState } from "react";
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
    <section id="contact" className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="CONTACT"
          title="무료 상담 신청"
          description="아래 폼으로 신청해 주세요. 보통 30분 내 답변드립니다. 더 빠른 상담이 필요하면 카카오톡으로도 문의 가능합니다."
        />

        <form
          className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-7 grid gap-4"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="이름" required>
              <input
                value={form.name}
                onChange={handle("name")}
                placeholder="홍길동"
                className={inputCls}
                autoComplete="name"
                required
              />
            </Field>
            <Field label="연락처" required>
              <input
                value={form.phone}
                onChange={handle("phone")}
                placeholder="010-0000-0000"
                className={inputCls}
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
                className={inputCls}
              />
            </Field>
            <Field label="업종">
              <input
                value={form.industry}
                onChange={handle("industry")}
                placeholder="예) 베이커리, 미용실, 학원"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="원하는 제작 상품">
            <select
              value={form.product}
              onChange={handle("product")}
              className={`${inputCls} appearance-none bg-white`}
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
              className={inputCls}
              inputMode="url"
            />
          </Field>

          <Field label="문의 내용">
            <textarea
              value={form.message}
              onChange={handle("message")}
              placeholder="어떤 홈페이지가 필요하신지 자유롭게 적어주세요."
              rows={5}
              className={`${inputCls} min-h-[120px] resize-y`}
            />
          </Field>

          {validationError && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
            >
              {validationError}
            </p>
          )}
          {status === "success" && (
            <p
              role="status"
              className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
            >
              상담 신청이 접수되었습니다. 빠르게 연락드리겠습니다.
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
            >
              접수 중 오류가 발생했습니다. 카카오톡 또는 전화로 문의해 주세요.
            </p>
          )}

          <div className="mt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-14 w-full sm:flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-7 text-[17px] font-semibold text-white transition-colors hover:bg-[var(--accent-strong)] active:bg-[var(--accent-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner /> 접수 중...
                </>
              ) : (
                SITE.cta.primary
              )}
            </button>
            <CTAButton
              href={SITE.contact.kakaoUrl}
              variant="kakao"
              size="lg"
              external
              className="w-full sm:flex-1"
              ariaLabel="카카오톡으로 상담하기"
            >
              <KakaoIcon /> 카카오톡 문의 (보조)
            </CTAButton>
          </div>

          <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">
            * 이름·연락처는 필수입니다. 입력하신 정보는 상담 회신 목적으로만 사용됩니다.
            <br />* 전화 상담:{" "}
            <a className="underline" href={`tel:${SITE.contact.phoneTel}`}>
              {SITE.contact.phone}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] placeholder:text-neutral-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 disabled:opacity-60";

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
      <span className="mb-1.5 block text-sm font-semibold text-[var(--primary)]">
        {label}
        {required && <span className="ml-1 text-[var(--accent)]">*</span>}
      </span>
      {children}
    </label>
  );
}

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3C6.477 3 2 6.477 2 10.77c0 2.77 1.86 5.197 4.66 6.57-.21.73-.76 2.69-.87 3.12-.14.53.19.52.4.38.17-.11 2.66-1.8 3.73-2.52.68.1 1.38.15 2.08.15 5.523 0 10-3.477 10-7.7C22 6.477 17.523 3 12 3z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
