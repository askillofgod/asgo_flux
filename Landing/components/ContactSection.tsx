"use client";

import { useMemo, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import CTAButton from "./ui/CTAButton";
import { SITE } from "@/data/site";
import { PRICING } from "@/data/pricing";

const PRODUCT_OPTIONS = [
  ...PRICING.map((p) => p.name),
  "아직 모르겠음",
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    company: "",
    industry: "",
    product: "",
    reference: "",
    message: "",
  });

  const mailtoHref = useMemo(() => {
    const subject = `[홈페이지 제작 문의] ${form.company || form.name || "신규 문의"}`;
    const body = [
      `이름: ${form.name}`,
      `연락처: ${form.phone}`,
      `업체명: ${form.company}`,
      `업종: ${form.industry}`,
      `원하는 제작 상품: ${form.product}`,
      `참고 사이트: ${form.reference}`,
      "",
      "문의 내용:",
      form.message,
    ].join("\n");
    return `mailto:${SITE.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [form]);

  const handle =
    <K extends keyof typeof form>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <section id="contact" className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="CONTACT"
          title="무료 상담 신청"
          description="입력 후 ‘카카오톡으로 보내기’ 또는 ‘이메일로 보내기’ 버튼을 눌러주세요. 보통 30분 내 답변드립니다."
        />

        <form
          className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-7 grid gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="이름" required>
              <input
                value={form.name}
                onChange={handle("name")}
                placeholder="홍길동"
                className={inputCls}
                autoComplete="name"
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
              value={form.reference}
              onChange={handle("reference")}
              placeholder="마음에 드는 사이트 주소가 있다면 알려주세요"
              className={inputCls}
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

          <div className="mt-2 flex flex-col sm:flex-row gap-3">
            <CTAButton
              href={SITE.contact.kakaoUrl}
              variant="kakao"
              size="lg"
              external
              className="w-full sm:flex-1"
              ariaLabel="카카오톡으로 상담하기"
            >
              <KakaoIcon /> 카카오톡으로 보내기
            </CTAButton>
            <CTAButton
              href={mailtoHref}
              variant="primary"
              size="lg"
              external
              className="w-full sm:flex-1"
              ariaLabel="이메일로 상담 내용 보내기"
            >
              이메일로 보내기
            </CTAButton>
          </div>

          <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">
            * 입력한 내용은 저장되지 않으며, 선택한 채널로만 전송됩니다.
            <br />* 전화 상담: <a className="underline" href={`tel:${SITE.contact.phoneTel}`}>{SITE.contact.phone}</a>
          </p>
        </form>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] placeholder:text-neutral-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20";

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
