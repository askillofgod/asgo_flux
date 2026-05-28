import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ServiceSection from "@/components/ServiceSection";
import PricingSection from "@/components/PricingSection";
import OptionSection from "@/components/OptionSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ScrollTopButton from "@/components/ScrollTopButton";
import InAppBrowserNotice from "@/components/InAppBrowserNotice";
import { SITE } from "@/data/site";
import { PRICING } from "@/data/pricing";
import { FAQ } from "@/data/faq";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}#organization`,
        name: SITE.name,
        alternateName: SITE.brandShort,
        url: SITE.url,
        logo: `${SITE.url}${SITE.ogImage}`,
        description: SITE.metaDescription,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: SITE.contact.phone,
            email: SITE.contact.email,
            contactType: "customer service",
            areaServed: "KR",
            availableLanguage: ["ko"],
          },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}#service`,
        name: SITE.name,
        url: SITE.url,
        image: `${SITE.url}${SITE.ogImage}`,
        description: SITE.metaDescription,
        priceRange: "₩₩",
        areaServed: { "@type": "Country", name: "대한민국" },
        telephone: SITE.contact.phone,
        email: SITE.contact.email,
        serviceType: "홈페이지 제작",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: "ko-KR",
        publisher: { "@id": `${SITE.url}#organization` },
      },
      {
        "@type": "OfferCatalog",
        name: "정찰제 홈페이지 제작 상품 — 당근 첫 광고 이벤트가",
        itemListElement: PRICING.map((p, i) => {
          const eventNum = (p.eventPrice ?? p.price).replace(/[^0-9]/g, "") + "0000";
          const listNum = p.price.replace(/[^0-9]/g, "") + "0000";
          const hasEvent = Boolean(p.eventPrice);
          return {
            "@type": "Offer",
            position: i + 1,
            name: p.name,
            price: eventNum,
            priceCurrency: "KRW",
            availability: "https://schema.org/InStock",
            description: p.features.join(", "),
            ...(hasEvent
              ? {
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    price: eventNum,
                    priceCurrency: "KRW",
                  },
                  // referencePrice (정가)
                  eligibleQuantity: undefined,
                  // schema.org 에 명시적 정가 필드는 없어 description 에 함께 노출
                }
              : {}),
            highPrice: hasEvent ? listNum : undefined,
            lowPrice: eventNum,
            itemOffered: {
              "@type": "Service",
              name: p.name,
              description: p.recommendFor,
            },
          };
        }),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pb-24 md:pb-0">
        <HeroSection />
        <ProblemSection />
        <ServiceSection />
        <PricingSection />
        <OptionSection />
        <PortfolioSection />
        <ProcessSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileCTA />
      <ScrollTopButton />
      <InAppBrowserNotice />
    </>
  );
}
