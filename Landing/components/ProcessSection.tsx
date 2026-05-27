import SectionTitle from "./ui/SectionTitle";
import { PROCESS } from "@/data/process";

export default function ProcessSection() {
  return (
    <section id="process" className="bg-white py-24 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="PROCESS"
          title={"상담부터 오픈까지,\n6단계로 진행됩니다."}
          description="평균 1~3주 안에 오픈할 수 있도록 단순한 절차로 진행합니다."
        />

        <ol className="mt-14 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((p) => (
            <li
              key={p.step}
              className="card-hover relative rounded-[22px] border border-[var(--border)] bg-white p-7 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] text-white text-[13.5px] font-black tracking-wider shadow-[0_8px_22px_-10px_rgba(37,99,235,0.55)]">
                  {p.step}
                </span>
                <span className="text-eyebrow text-[var(--accent)]">STEP {p.step}</span>
              </div>
              <h3 className="mt-5 text-h3 text-[var(--primary)]">
                {p.title}
              </h3>
              <p className="mt-3 text-body text-[var(--text-soft)]">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
