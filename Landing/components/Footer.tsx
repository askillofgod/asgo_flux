import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#06091a] py-12 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/40 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent)] text-white text-sm font-black">
              A
            </span>
            <div>
              <p className="text-white font-extrabold tracking-tight">{SITE.name}</p>
              <p className="mt-0.5 text-[13px] text-white/55">
                소상공인·자영업자를 위한 정찰제 홈페이지 제작
              </p>
            </div>
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
