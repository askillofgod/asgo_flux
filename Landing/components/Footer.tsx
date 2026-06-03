import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--bg-soft)] border-t border-[var(--border)] py-12 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE.logo}
              alt={SITE.name}
              width={644}
              height={132}
              className="block self-start h-[18px] sm:h-[22px] w-auto object-contain select-none"
              draggable={false}
            />
            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
              {SITE.brandDescription}
            </p>
            {/* 사업자 정보 */}
            <dl className="mt-1 grid gap-1 text-[12px] sm:text-[12.5px] text-[var(--text-muted)] leading-relaxed">
              <div className="flex gap-2">
                <dt className="text-[var(--text-faint)] min-w-[5.5em]">대표</dt>
                <dd>{SITE.business.representative}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-[var(--text-faint)] min-w-[5.5em]">사업자등록번호</dt>
                <dd className="tabular-nums">{SITE.business.registrationNo}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-[var(--text-faint)] min-w-[5.5em]">주소</dt>
                <dd>{SITE.business.address}</dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-col sm:items-end gap-1.5 text-[13.5px]">
            <a
              href={`mailto:${SITE.contact.email}`}
              className="text-[var(--accent)] hover:text-[var(--accent-strong)] font-semibold transition-colors"
            >
              {SITE.contact.email}
            </a>
            <a
              href={`tel:${SITE.contact.phoneTel}`}
              className="text-[var(--accent)] hover:text-[var(--accent-strong)] font-semibold transition-colors"
            >
              {SITE.contact.phone}
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11.5px] text-[var(--text-faint)]">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="tracking-wider uppercase">정찰제 · 빠른 제작 · 모바일 최적화</p>
        </div>
      </div>
    </footer>
  );
}
