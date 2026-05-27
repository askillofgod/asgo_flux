import SectionTitle from "./ui/SectionTitle";
import { PROBLEMS } from "@/data/problems";

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-white py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="PROBLEM"
          title={"홈페이지가 필요하지만,\n이런 점이 막막하지 않으셨나요?"}
        />

        <ul className="mt-12 sm:mt-14 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <li
              key={p.title}
              className="card-hover group relative rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-7 shadow-[var(--shadow-card)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-cyan)]/10 text-[var(--accent)] font-black text-[15px] tracking-tight border border-[var(--accent)]/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[16px] sm:text-[17px] font-bold text-[var(--primary)] leading-snug">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--text-muted)]">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
