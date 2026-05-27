import SectionTitle from "./ui/SectionTitle";
import FeatureCard from "./ui/FeatureCard";
import { SERVICE_FEATURES } from "@/data/services";

export default function ServiceSection() {
  return (
    <section id="service" className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="SERVICE"
          title={"필요한 만큼만,\n빠르게 만들어 드립니다."}
          description="ASOG 정찰제 홈페이지 제작소는 디자인 스튜디오가 아니라 ‘소상공인을 위한 홈페이지 제작 가게’를 지향합니다."
        />

        <div className="mt-10 sm:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_FEATURES.map((f) => (
            <FeatureCard key={f.title} title={f.title} body={f.body} />
          ))}
        </div>
      </div>
    </section>
  );
}
