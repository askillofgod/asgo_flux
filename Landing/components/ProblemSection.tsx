import SectionTitle from "./ui/SectionTitle";
import { PROBLEMS } from "@/data/problems";

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-[var(--bg-soft)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="PROBLEM"
          title={"홈페이지가 필요하지만,\n이런 점이 막막하지 않으셨나요?"}
        />

        <ul className="mt-10 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p) => (
            <li
              key={p.title}
              className="rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[var(--bg-soft)] text-[var(--accent)]">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 6h2v6H9V6zm0 7h2v2H9v-2z" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-[15px] sm:text-base font-bold text-[var(--primary)]">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-[var(--text-muted)]">
                    {p.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
