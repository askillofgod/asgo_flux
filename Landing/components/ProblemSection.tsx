import SectionTitle from "./ui/SectionTitle";
import { PROBLEMS } from "@/data/problems";

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-white py-24 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="PROBLEM"
          title={"홈페이지가 필요하지만,\n이런 점이 막막하지 않으셨나요?"}
        />

        <ul className="mt-14 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <li
              key={p.title}
              className="card-hover relative rounded-[22px] border border-[var(--border)] bg-white p-7 sm:p-8 shadow-[var(--shadow-card)]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-cyan)]/10 text-[var(--accent)] font-black text-[15px] tracking-tight border border-[var(--accent)]/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-h3 text-[var(--primary)]">
                {p.title}
              </h3>
              <p className="mt-3 text-body text-[var(--text-soft)]">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
