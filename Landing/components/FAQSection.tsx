import SectionTitle from "./ui/SectionTitle";
import FAQItem from "./ui/FAQItem";
import { FAQ } from "@/data/faq";

export default function FAQSection() {
  return (
    <section id="faq" className="bg-[var(--bg-soft)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="FAQ"
          title="자주 묻는 질문"
          description="더 궁금하신 점은 카카오톡으로 편하게 문의해 주세요."
        />

        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white px-5 sm:px-6">
          {FAQ.map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
