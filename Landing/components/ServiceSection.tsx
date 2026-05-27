import SectionTitle from "./ui/SectionTitle";
import { SERVICE_FEATURES } from "@/data/services";

const ICONS = [
  "M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4z",
  "M13 2L3 14h7v8l10-12h-7V2z",
  "M7 4h10v2H7V4zm-1 4h12v12H6V8zm2 2v8h8v-8H8z",
  "M3 12l2-2 4 4 8-8 2 2-10 10-6-6z",
  "M11 4a7 7 0 016.32 9.9l3.39 3.4-1.41 1.4-3.4-3.39A7 7 0 1111 4z",
  "M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 7v5l3 3",
];

export default function ServiceSection() {
  return (
    <section id="service" className="bg-[var(--bg-soft)] py-24 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="SERVICE"
          title={"필요한 만큼만,\n빠르게 만들어 드립니다."}
          description="ASOG 정찰제 홈페이지 제작소는 디자인 스튜디오가 아니라 ‘소상공인을 위한 홈페이지 제작 가게’를 지향합니다."
        />

        <div className="mt-14 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="card-hover relative rounded-[22px] border border-[var(--border)] bg-white p-7 sm:p-8"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] text-white shadow-[0_10px_24px_-12px_rgba(37,99,235,0.55)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                  <path d={ICONS[i % ICONS.length]} />
                </svg>
              </div>
              <h3 className="mt-5 text-h3 text-[var(--primary)]">
                {f.title}
              </h3>
              <p className="mt-3 text-body text-[var(--text-soft)]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
