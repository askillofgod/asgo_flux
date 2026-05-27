import SectionTitle from "./ui/SectionTitle";
import { OPTIONS } from "@/data/options";

export default function OptionSection() {
  return (
    <section id="options" className="bg-white py-24 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="ADD-ON"
          title="필요할 때만 추가하는 옵션"
          description="필요한 옵션만 골라서 추가하세요. 안 쓰는 기능은 결제하지 않습니다."
        />

        <div className="mt-14 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OPTIONS.map((o) => (
            <div
              key={o.name}
              className="card-hover relative rounded-[22px] border border-[var(--border)] bg-white p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[16px] sm:text-[17px] font-extrabold tracking-tight text-[var(--primary)]">
                  {o.name}
                </h3>
                <span className="flex-none rounded-lg bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-cyan)]/12 px-3 py-1.5 text-[13.5px] font-extrabold text-[var(--accent-strong)] border border-[var(--accent)]/15">
                  {o.price}
                </span>
              </div>
              {o.description && (
                <p className="mt-3 text-body text-[var(--text-soft)]">
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
