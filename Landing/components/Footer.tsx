import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm text-[var(--text-muted)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[var(--primary)] font-extrabold">{SITE.name}</p>
            <p className="mt-1">소상공인·자영업자를 위한 정찰제 홈페이지 제작</p>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <a href={`mailto:${SITE.contact.email}`} className="hover:text-[var(--accent)]">
              {SITE.contact.email}
            </a>
            <a href={`tel:${SITE.contact.phoneTel}`} className="hover:text-[var(--accent)]">
              {SITE.contact.phone}
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-neutral-400">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
