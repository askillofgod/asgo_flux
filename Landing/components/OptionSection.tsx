import SectionTitle from "./ui/SectionTitle";
import { OPTIONS } from "@/data/options";

export default function OptionSection() {
  return (
    <section id="options" className="bg-white py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="ADD-ON"
          title="필요할 때만 추가하는 옵션"
          description="필요한 옵션만 골라서 추가하세요. 안 쓰는 기능은 결제하지 않습니다."
        />

        <div className="mt-12 sm:mt-14 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OPTIONS.map((o) => (
            <div
              key={o.name}
              className="card-hover group relative flex flex-col rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[15.5px] sm:text-[16px] font-bold text-[var(--primary)]">
                  {o.name}
                </h3>
                <span className="flex-none rounded-lg bg-gradient-to-br from-[var(--accent)]/[0.08] to-[var(--accent-cyan)]/[0.10] px-2.5 py-1 text-[13px] font-extrabold text-[var(--accent-strong)] border border-[var(--accent)]/15">
                  {o.price}
                </span>
              </div>
              {o.description && (
                <p className="mt-2 text-[14px] text-[var(--text-muted)] leading-relaxed">
                  {o.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
