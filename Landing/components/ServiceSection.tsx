import SectionTitle from "./ui/SectionTitle";
import { SERVICE_FEATURES } from "@/data/services";

const ICONS = [
  "M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4z", // shield
  "M13 2L3 14h7v8l10-12h-7V2z", // bolt
  "M7 4h10v2H7V4zm-1 4h12v12H6V8zm2 2v8h8v-8H8z", // mobile
  "M3 12l2-2 4 4 8-8 2 2-10 10-6-6z", // target check
  "M11 4a7 7 0 016.32 9.9l3.39 3.4-1.41 1.4-3.4-3.39A7 7 0 1111 4z", // search
  "M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 7v5l3 3", // clock
];

export default function ServiceSection() {
  return (
    <section id="service" className="bg-[var(--bg-soft)] py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="SERVICE"
          title={"필요한 만큼만,\n빠르게 만들어 드립니다."}
          description="ASOG 정찰제 홈페이지 제작소는 디자인 스튜디오가 아니라 ‘소상공인을 위한 홈페이지 제작 가게’를 지향합니다."
        />

        <div className="mt-12 sm:mt-14 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="card-hover relative rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-7"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] text-white shadow-[0_8px_22px_-10px_rgba(37,99,235,0.55)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d={ICONS[i % ICONS.length]} />
                </svg>
              </div>
              <h3 className="mt-4 text-[16px] sm:text-[17px] font-bold text-[var(--primary)]">
                {f.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] sm:text-[15px] leading-relaxed text-[var(--text-muted)]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
