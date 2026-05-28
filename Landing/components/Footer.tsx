import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#06091a] py-12 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/40 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="flex flex-col gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE.logo}
              alt={SITE.name}
              width={729}
              height={164}
              className="h-8 sm:h-9 w-auto select-none"
              draggable={false}
            />
            <p className="text-[13px] text-white/65 leading-relaxed">
              {SITE.brandDescription}
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-1.5 text-[13.5px]">
            <a
              href={`mailto:${SITE.contact.email}`}
              className="text-white/80 hover:text-white transition-colors"
            >
              {SITE.contact.email}
            </a>
            <a
              href={`tel:${SITE.contact.phoneTel}`}
              className="text-white/80 hover:text-white transition-colors"
            >
              {SITE.contact.phone}
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11.5px] text-white/45">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="tracking-wider uppercase">정찰제 · 빠른 제작 · 모바일 최적화</p>
        </div>
      </div>
    </footer>
  );
}
