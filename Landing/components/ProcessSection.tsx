import SectionTitle from "./ui/SectionTitle";
import { PROCESS } from "@/data/process";

export default function ProcessSection() {
  return (
    <section id="process" className="bg-[var(--bg-soft)] py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="PROCESS"
          title={"상담부터 오픈까지,\n6단계로 진행됩니다."}
          description="평균 1~3주 안에 오픈할 수 있도록 단순한 절차로 진행합니다."
        />

        <ol className="mt-12 sm:mt-14 relative grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((p, i) => (
            <li
              key={p.step}
              className="card-hover relative rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] text-white text-[13px] font-black tracking-wider shadow-[0_6px_18px_-8px_rgba(37,99,235,0.55)]">
                  {p.step}
                </span>
                <span className="text-[11.5px] font-bold tracking-[0.18em] uppercase text-[var(--accent)]">
                  STEP {p.step}
                </span>
              </div>
              <h3 className="mt-4 text-[17px] sm:text-[18px] font-bold text-[var(--primary)]">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] sm:text-[15px] leading-relaxed text-[var(--text-muted)]">
                {p.body}
              </p>

              {/* connector dot (decorative) */}
              {i < PROCESS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute -right-2.5 top-9 h-1.5 w-1.5 rounded-full bg-[var(--accent)]/40"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
