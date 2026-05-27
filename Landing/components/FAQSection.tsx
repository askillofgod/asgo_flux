import SectionTitle from "./ui/SectionTitle";
import FAQItem from "./ui/FAQItem";
import { FAQ } from "@/data/faq";

export default function FAQSection() {
  return (
    <section id="faq" className="bg-[var(--bg-soft)] py-24 sm:py-28 md:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="FAQ"
          title="자주 묻는 질문"
          description="더 궁금하신 점은 카카오톡으로 편하게 문의해 주세요."
        />

        <div className="mt-14 flex flex-col gap-3.5">
          {FAQ.map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
