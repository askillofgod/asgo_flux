import SectionTitle from "./ui/SectionTitle";
import { OPTIONS } from "@/data/options";

export default function OptionSection() {
  return (
    <section id="options" className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="ADD-ON"
          title="필요할 때만 추가하는 옵션"
          description="필요한 옵션만 골라서 추가하세요. 안 쓰는 기능은 결제하지 않습니다."
        />

        <div className="mt-10 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OPTIONS.map((o) => (
            <div
              key={o.name}
              className="flex items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-6 hover:border-[var(--accent)] transition-colors"
            >
              <div>
                <h3 className="text-[15px] sm:text-base font-bold text-[var(--primary)]">
                  {o.name}
                </h3>
                {o.description && (
                  <p className="mt-1.5 text-sm text-[var(--text-muted)] leading-relaxed">
                    {o.description}
                  </p>
                )}
              </div>
              <span className="flex-none rounded-lg bg-[var(--bg-soft)] px-3 py-1.5 text-sm font-extrabold text-[var(--primary)]">
                {o.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
