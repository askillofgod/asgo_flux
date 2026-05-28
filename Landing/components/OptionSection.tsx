import SectionTitle from "./ui/SectionTitle";
import { OPTIONS } from "@/data/options";

export default function OptionSection() {
  return (
    <section id="options" className="bg-white py-24 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="ADD-ON"
          title="필요할 때만 추가하는 옵션"
          description="필요한 옵션만 골라서 추가하세요. 안 쓰는 기능은 결제하지 않습니다. 이벤트 기간 동안 옵션도 약 50% 할인 적용됩니다."
        />

        <div className="mt-14 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OPTIONS.map((o) => {
            const hasEvent = Boolean(o.eventPrice);
            return (
              <div
                key={o.name}
                className="card-hover relative rounded-[22px] border border-[var(--border)] bg-white p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[16px] sm:text-[17px] font-extrabold tracking-tight text-[var(--primary)]">
                    {o.name}
                  </h3>

                  <div className="flex flex-col items-end gap-1 flex-none">
                    {hasEvent && (
                      <span className="text-[12px] line-through text-[var(--text-muted)]">
                        {o.price}
                      </span>
                    )}
                    <span
                      className={[
                        "rounded-lg px-3 py-1.5 text-[14px] font-extrabold border",
                        hasEvent
                          ? "bg-gradient-to-br from-[var(--accent)]/[0.10] to-[var(--accent-cyan)]/[0.14] text-[var(--accent-strong)] border-[var(--accent)]/25 shadow-[0_4px_12px_-6px_rgba(37,99,235,0.35)]"
                          : "bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-cyan)]/12 text-[var(--accent-strong)] border-[var(--accent)]/15",
                      ].join(" ")}
                    >
                      {hasEvent ? o.eventPrice : o.price}
                    </span>
                  </div>
                </div>
                {o.description && (
                  <p className="mt-3 text-body text-[var(--text-soft)]">
                    {o.description}
                  </p>
                )}
                {hasEvent && (
                  <p className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-bold tracking-wide text-[var(--accent)]">
                    <span aria-hidden="true">🥕</span>
                    당근 첫 광고 이벤트가
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
