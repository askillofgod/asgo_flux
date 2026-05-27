import SectionTitle from "./ui/SectionTitle";
import { PROCESS } from "@/data/process";

export default function ProcessSection() {
  return (
    <section id="process" className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="PROCESS"
          title={"상담부터 오픈까지,\n6단계로 진행됩니다."}
          description="평균 1~3주 안에 오픈할 수 있도록 단순한 절차로 진행합니다."
        />

        <ol className="mt-10 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((p) => (
            <li
              key={p.step}
              className="rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-black text-[var(--accent)] tracking-widest">
                  STEP {p.step}
                </span>
              </div>
              <h3 className="mt-2 text-base sm:text-lg font-bold text-[var(--primary)]">
                {p.title}
              </h3>
              <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[var(--text-muted)]">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
