import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: "About ASOG | 15년 실무 경험 기반 웹디자인 스튜디오",
  },
  description:
    "ASOG는 다양한 기업·기관 프로젝트 경험을 바탕으로 랜딩페이지, 홈페이지, 상세페이지의 목적과 사용자 흐름을 설계하는 웹디자인 스튜디오입니다.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE.name,
    title: "About ASOG | 15년 실무 경험 기반 웹디자인 스튜디오",
    description:
      "ASOG는 다양한 기업·기관 프로젝트 경험을 바탕으로 랜딩페이지, 홈페이지, 상세페이지의 목적과 사용자 흐름을 설계하는 웹디자인 스튜디오입니다.",
    url: `${SITE.url}/about`,
    images: [
      {
        url: `${SITE.url}${SITE.ogImage}`,
        width: 1254,
        height: 1254,
        alt: `${SITE.name} — ${SITE.tagline}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ASOG | 15년 실무 경험 기반 웹디자인 스튜디오",
    description:
      "ASOG는 다양한 기업·기관 프로젝트 경험을 바탕으로 웹사이트의 목적과 사용자 흐름을 설계합니다.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ExperienceOverview />
      <TrackRecord />
      <WorkPhilosophy />
      <AboutProcess />
      <ClosingCTA />
    </>
  );
}

/* ============================================================
   1) Hero
   ============================================================ */
function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-clinic pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-40 md:pb-28">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="orb orb-1 -z-10" style={{ width: 520, height: 520, top: -180, left: -120 }} aria-hidden="true" />
      <div className="orb orb-2 -z-10" style={{ width: 480, height: 480, top: -120, right: -140 }} aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid md:grid-cols-[55%_45%] gap-10 md:gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[var(--border)] px-3.5 py-1.5 text-[12.5px] sm:text-[13px] font-semibold text-[var(--accent-strong)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              ABOUT
            </span>
            <h1 className="mt-6 text-display text-[var(--primary)]">
              15년의 디지털 프로젝트 경험을
              <br />
              <span className="text-gradient">ASOG의 설계력</span>으로 다시 담다
            </h1>
            <p className="mt-7 text-lead text-[var(--text-muted)]">
              삼성전자, LG전자, 현대자동차, 포스코, 스카이라이프, KDB생명, 굿네이버스, 암웨이 코리아, 로레알 코리아 등 다양한 기업·기관 프로젝트 경험을 바탕으로 웹사이트의 목적과 사용자 흐름을 설계합니다.
            </p>
          </div>

          <HeroMockupCollage />
        </div>
      </div>
    </section>
  );
}

function HeroMockupCollage() {
  return (
    <div className="relative h-[360px] sm:h-[420px] md:h-[460px] mt-4 md:mt-0">
      {/* PC card 1 */}
      <MockupCard
        kind="pc"
        label="Project UI"
        className="absolute top-2 left-2 sm:left-6 w-[68%] sm:w-[72%] -rotate-[3deg]"
      />
      {/* PC card 2 */}
      <MockupCard
        kind="pc"
        label="Project UI"
        className="absolute top-[42%] left-6 sm:left-14 w-[64%] sm:w-[68%] rotate-[2deg] opacity-95"
      />
      {/* Mobile 1 */}
      <MockupCard
        kind="mobile"
        label="Mobile UI"
        className="absolute top-[20%] right-2 w-[28%] sm:w-[26%] rotate-[5deg]"
      />
      {/* Mobile 2 */}
      <MockupCard
        kind="mobile"
        label="Mobile UI"
        className="absolute bottom-2 right-[18%] sm:right-[22%] w-[26%] sm:w-[24%] -rotate-[4deg]"
      />
      {/* Wireframe */}
      <MockupCard
        kind="wireframe"
        label="Wireframe"
        className="absolute bottom-4 right-1 w-[40%] sm:w-[38%] rotate-[6deg]"
      />
    </div>
  );
}

type MockupKind = "pc" | "mobile" | "wireframe";

function MockupCard({
  kind,
  label,
  className = "",
}: {
  kind: MockupKind;
  label: string;
  className?: string;
}) {
  const base =
    "relative rounded-2xl overflow-hidden bg-white border border-[var(--border)] shadow-[0_20px_50px_-22px_rgba(37,99,235,0.30)]";
  if (kind === "mobile") {
    return (
      <div className={`${base} ${className}`} aria-hidden="true">
        <div className="aspect-[9/16] flex flex-col">
          <div className="h-6 flex items-center justify-center">
            <span className="h-1 w-8 rounded-full bg-[var(--border-strong)]" />
          </div>
          <div className="flex-1 p-2 space-y-1.5">
            <div className="h-12 rounded-lg bg-gradient-to-br from-[var(--accent)]/30 to-[var(--accent-cyan)]/25" />
            <div className="h-2 rounded bg-[var(--border-strong)] w-3/4" />
            <div className="h-2 rounded bg-[var(--border)] w-1/2" />
            <div className="grid grid-cols-2 gap-1.5 pt-1.5">
              <div className="h-10 rounded bg-[var(--bg-soft)]" />
              <div className="h-10 rounded bg-[var(--bg-soft)]" />
            </div>
            <div className="h-6 rounded-md bg-gradient-to-r from-[var(--accent)] to-[var(--accent-cyan)] mt-auto" />
          </div>
        </div>
        <Tag label={label} />
      </div>
    );
  }
  if (kind === "wireframe") {
    return (
      <div className={`${base} ${className}`} aria-hidden="true">
        <div className="aspect-[16/10] p-3 grid grid-cols-3 gap-1.5">
          <div className="col-span-3 h-3 rounded border border-dashed border-[var(--border-strong)]" />
          <div className="col-span-2 h-16 rounded border border-dashed border-[var(--border-strong)]" />
          <div className="col-span-1 h-16 rounded border border-dashed border-[var(--border-strong)]" />
          <div className="col-span-3 h-3 rounded border border-dashed border-[var(--border-strong)] mt-1" />
          <div className="col-span-3 h-6 rounded border border-dashed border-[var(--border-strong)]" />
        </div>
        <Tag label={label} />
      </div>
    );
  }
  // pc
  return (
    <div className={`${base} ${className}`} aria-hidden="true">
      <div className="aspect-[16/10] flex flex-col">
        <div className="h-5 sm:h-6 px-2 flex items-center gap-1.5 bg-[var(--bg-soft)] border-b border-[var(--border)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--border-strong)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--border-strong)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--border-strong)]" />
        </div>
        <div className="flex-1 p-2.5 grid grid-cols-3 gap-1.5">
          <div className="col-span-3 h-3 rounded bg-[var(--border)] w-2/3" />
          <div className="col-span-3 h-6 rounded bg-gradient-to-r from-[var(--accent)]/40 to-[var(--accent-cyan)]/30" />
          <div className="col-span-1 h-10 rounded bg-[var(--bg-soft)]" />
          <div className="col-span-1 h-10 rounded bg-[var(--bg-soft)]" />
          <div className="col-span-1 h-10 rounded bg-[var(--bg-soft)]" />
        </div>
      </div>
      <Tag label={label} />
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-white border border-[var(--border)] px-2 py-0.5 text-[9.5px] sm:text-[10px] font-bold tracking-wider text-[var(--accent-strong)] uppercase">
      {label}
    </span>
  );
}

/* ============================================================
   2) Experience Overview
   ============================================================ */
function ExperienceOverview() {
  const items = [
    { title: "15+ Years", body: "웹디자인·UI/UX 실무 경험", icon: <IconClock /> },
    { title: "Corporate", body: "기업 홈페이지 및 브랜드 사이트", icon: <IconBuilding /> },
    { title: "Public / Finance", body: "공공기관·금융권 프로젝트", icon: <IconShield /> },
    { title: "Campaign / Commerce", body: "캠페인·상세페이지·프로모션", icon: <IconBolt /> },
  ];
  return (
    <section className="relative overflow-hidden bg-[var(--bg-section)] py-24 sm:py-28 md:py-32">
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="EXPERIENCE"
          title="다양한 산업에서 검증된 실무 경험"
          description="ASOG의 작업 방식은 15년간 다양한 디지털 프로젝트에서 쌓아온 실무 경험을 기반으로 합니다. 기업 홈페이지, 공공기관 사이트, 금융권 프로젝트, 브랜드 캠페인, 내부 시스템 UI, 상세페이지까지 폭넓은 경험을 웹 제작 프로세스에 반영합니다."
        />
        <div className="mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className="card-hover relative rounded-[22px] bg-white border border-[var(--border)] p-6 sm:p-7 shadow-[var(--shadow-card)]">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] text-white shadow-[0_10px_22px_-12px_rgba(37,99,235,0.55)]">
                {it.icon}
              </div>
              <h3 className="mt-5 text-[18px] sm:text-[20px] font-extrabold tracking-tight text-[var(--primary)]">
                {it.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--text-muted)]">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3) Track Record
   ============================================================ */
function TrackRecord() {
  const items = [
    {
      category: "Enterprise & Brand Website",
      title: "기업 홈페이지 / 브랜드 사이트",
      body:
        "삼성전자, LG전자, 스카이라이프, 현대자동차, 포스코 등 다양한 기업 프로젝트 경험을 바탕으로 브랜드 신뢰도와 정보 전달력을 높이는 웹사이트 구조를 설계합니다.",
      mockup: "enterprise" as const,
    },
    {
      category: "Public & Institution",
      title: "공공기관 / 협회 / 연구기관",
      body:
        "금융정보분석원, 한국경제교육협회, 공공기관 및 연구기관 프로젝트 경험을 통해 신뢰성, 접근성, 정보 구조가 중요한 웹사이트를 설계해왔습니다.",
      mockup: "public" as const,
    },
    {
      category: "Finance & Internal System",
      title: "금융 / 내부 시스템 UI",
      body:
        "KDB생명, KEB하나은행, LG U+ 등 금융 및 기업 내부 시스템 프로젝트를 통해 복잡한 정보를 명확하게 정리하는 UI/UX 경험을 쌓았습니다.",
      mockup: "dashboard" as const,
    },
    {
      category: "Campaign & Promotion",
      title: "캠페인 / 프로모션 사이트",
      body:
        "굿네이버스, 글로벌 공모전, 브랜드 캠페인 사이트 등 사용자 참여와 메시지 전달이 중요한 디지털 캠페인 경험을 보유하고 있습니다.",
      mockup: "campaign" as const,
    },
    {
      category: "Commerce & Detail Page",
      title: "상세페이지 / 커머스 콘텐츠",
      body:
        "암웨이 코리아, 로레알 코리아, 허벌라이프, 세라젬 등 제품과 브랜드의 장점을 설득력 있게 전달하는 상세페이지 및 미니사이트 경험을 보유하고 있습니다.",
      mockup: "commerce" as const,
    },
  ];

  return (
    <section className="bg-[var(--bg-soft)] py-24 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="TRACK RECORD"
          title="Track Record"
          description="아래 프로젝트들은 ASOG 대표가 이전 소속사 및 협업 프로젝트에서 메인 디자이너, UI/UX 디자이너, 웹기획자, PM 역할로 참여한 주요 경험입니다. 각 프로젝트의 경험은 현재 ASOG의 기획 및 디자인 프로세스에 반영되어 있습니다."
        />
        <div className="mt-14 sm:mt-16 space-y-10 sm:space-y-14">
          {items.map((it, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={it.title}
                className={[
                  "flex flex-col gap-6 md:gap-10 items-stretch md:items-center",
                  reverse ? "md:flex-row-reverse" : "md:flex-row",
                ].join(" ")}
              >
                <div className="md:w-1/2">
                  <TrackMockup kind={it.mockup} />
                </div>
                <div className="md:w-1/2">
                  <span className="inline-flex rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-3 py-1 text-[11.5px] font-bold tracking-wider text-[var(--accent-strong)] uppercase">
                    {it.category}
                  </span>
                  <h3 className="mt-3 text-[22px] sm:text-[26px] font-extrabold tracking-tight text-[var(--primary)]">
                    {it.title}
                  </h3>
                  <p className="mt-4 text-body-lg text-[var(--text-soft)]">{it.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type TrackMockupKind = "enterprise" | "public" | "dashboard" | "campaign" | "commerce";

function TrackMockup({ kind }: { kind: TrackMockupKind }) {
  // 라이트 톤 — 흰 배경 + 옅은 블루 그라데이션 + 다크 UI 요소
  const palette: Record<TrackMockupKind, { tag: string; hue: string }> = {
    enterprise: { tag: "Project UI", hue: "from-[#eaf3ff] to-[#d8ecff]" },
    public: { tag: "Information Architecture", hue: "from-[#f0f7ff] to-[#dfeeff]" },
    dashboard: { tag: "Dashboard / System", hue: "from-[#e6f8ff] to-[#cfeffd]" },
    campaign: { tag: "Campaign UI", hue: "from-[#f1edff] to-[#dfd5ff]" },
    commerce: { tag: "Detail Page", hue: "from-[#e2f4ff] to-[#caeaff]" },
  };
  const p = palette[kind];
  return (
    <div
      className={`relative aspect-[16/10] rounded-2xl border border-[var(--border)] bg-gradient-to-br ${p.hue} shadow-[0_22px_56px_-22px_rgba(37,99,235,0.30)] overflow-hidden`}
      aria-hidden="true"
    >
      {/* browser chrome */}
      <div className="h-6 sm:h-7 px-3 flex items-center gap-1.5 bg-white/60 border-b border-[var(--border)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]/30" />
      </div>

      {/* content per kind */}
      <div className="absolute inset-x-0 bottom-0 top-7 p-4 sm:p-5">
        {kind === "enterprise" && (
          <div className="grid grid-cols-3 gap-2 h-full">
            <div className="col-span-3 h-3 rounded bg-[var(--primary)]/25 w-1/2" />
            <div className="col-span-3 h-8 rounded bg-[var(--primary)]/08" />
            <div className="h-12 rounded bg-white/70" />
            <div className="h-12 rounded bg-white/70" />
            <div className="h-12 rounded bg-white/70" />
            <div className="col-span-2 h-5 rounded bg-[var(--primary)]/10" />
            <div className="h-5 rounded bg-[var(--accent)]/40" />
          </div>
        )}
        {kind === "public" && (
          <div className="space-y-2 h-full">
            <div className="h-3 rounded bg-[var(--primary)]/25 w-1/3" />
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-2 rounded bg-[var(--primary)]/12" />
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3">
              <div className="h-12 rounded bg-white/70" />
              <div className="h-12 rounded bg-white/70" />
              <div className="h-12 rounded bg-white/70" />
              <div className="h-12 rounded bg-white/70" />
            </div>
            <div className="h-2 rounded bg-[var(--primary)]/15 w-2/3 mt-3" />
            <div className="h-2 rounded bg-[var(--primary)]/10 w-1/2" />
          </div>
        )}
        {kind === "dashboard" && (
          <div className="grid grid-cols-4 gap-2 h-full">
            <div className="col-span-2 h-12 rounded bg-white/70 p-2">
              <div className="h-1.5 rounded bg-[var(--primary)]/30 w-1/2 mb-1" />
              <div className="h-4 rounded bg-gradient-to-r from-[#38bdf8] to-[#2563eb] w-3/4" />
            </div>
            <div className="h-12 rounded bg-white/70" />
            <div className="h-12 rounded bg-white/70" />
            <div className="col-span-4 h-14 rounded bg-white/60 grid grid-cols-7 gap-1 p-1.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="rounded bg-[var(--accent)]/35" />
              ))}
            </div>
          </div>
        )}
        {kind === "campaign" && (
          <div className="relative h-full">
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <div className="mx-auto h-2 rounded bg-[var(--primary)]/30 w-24 mb-2" />
                <div className="mx-auto h-4 rounded bg-[var(--primary)]/40 w-32 mb-3" />
                <div className="mx-auto h-6 w-24 rounded-full bg-gradient-to-r from-[#a78bfa] to-[#7c3aed]" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 h-8 w-8 rounded-full bg-white/70" />
            <div className="absolute top-2 right-3 h-6 w-6 rounded-full bg-white/70" />
          </div>
        )}
        {kind === "commerce" && (
          <div className="grid grid-cols-3 gap-2 h-full">
            <div className="col-span-1 h-full rounded bg-white/70" />
            <div className="col-span-2 space-y-1.5">
              <div className="h-2 rounded bg-[var(--primary)]/30 w-1/2" />
              <div className="h-1.5 rounded bg-[var(--primary)]/20 w-3/4" />
              <div className="h-1.5 rounded bg-[var(--primary)]/20 w-2/3" />
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                <div className="h-6 rounded bg-white/70" />
                <div className="h-6 rounded bg-white/70" />
              </div>
              <div className="h-5 rounded bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] mt-1.5" />
            </div>
          </div>
        )}
      </div>

      <span className="absolute top-2 right-3 inline-flex items-center rounded-full bg-white border border-[var(--border)] px-2 py-0.5 text-[9.5px] font-bold tracking-wider text-[var(--accent-strong)] uppercase">
        {p.tag}
      </span>
    </div>
  );
}

/* ============================================================
   4) Work Philosophy
   ============================================================ */
function WorkPhilosophy() {
  const points = [
    { title: "목적 정리", body: "웹사이트가 해야 할 역할을 먼저 정의합니다." },
    { title: "흐름 설계", body: "사용자가 정보를 이해하고 행동하기까지의 과정을 설계합니다." },
    { title: "시각화", body: "브랜드의 신뢰와 매력을 디자인으로 표현합니다." },
  ];
  return (
    <section className="bg-white py-24 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 md:gap-12 items-center md:grid-cols-[45%_55%]">
          <FlowMockup />
          <div>
            <SectionTitle
              eyebrow="PHILOSOPHY"
              align="left"
              title={"디자인 이전에,\n구조를 먼저 봅니다"}
              description="ASOG는 화면을 만들기 전에 브랜드의 목적, 사용자의 이동 흐름, 콘텐츠 우선순위를 먼저 정리합니다. 필요한 정보가 어디에 배치되어야 하는지, 사용자가 어떤 순서로 이해해야 하는지, 최종적으로 어떤 행동까지 이어져야 하는지를 기준으로 페이지를 설계합니다."
            />
            <ul className="mt-8 space-y-5">
              {points.map((p, i) => (
                <li key={p.title} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] text-white text-[13.5px] font-black tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[17px] sm:text-[18px] font-bold text-[var(--primary)]">{p.title}</h3>
                    <p className="mt-1.5 text-body text-[var(--text-soft)]">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowMockup() {
  return (
    <div className="relative aspect-[5/4] rounded-2xl bg-gradient-to-br from-[#f8fcff] via-[#eff8ff] to-[#dfeeff] p-6 sm:p-8 border border-[var(--border)] shadow-[0_22px_56px_-22px_rgba(37,99,235,0.25)] overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320" aria-hidden="true">
        <defs>
          <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        {/* connecting lines */}
        <path d="M100 80 L220 80 L220 160 L320 160" stroke="url(#flowGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.7" />
        <path d="M100 240 L220 240 L220 160" stroke="url(#flowGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.7" />
      </svg>
      {/* nodes */}
      <div className="absolute left-6 top-12 w-24 sm:w-28 rounded-xl bg-white/80 border border-[var(--border)] px-3 py-2 backdrop-blur shadow-sm">
        <p className="text-[9.5px] font-bold tracking-wider text-[var(--text-muted)] uppercase">Purpose</p>
        <p className="mt-0.5 text-[12px] font-bold text-[var(--primary)]">목적 정리</p>
      </div>
      <div className="absolute left-1/2 top-32 -translate-x-1/2 w-28 sm:w-32 rounded-xl bg-white/80 border border-[var(--border)] px-3 py-2 backdrop-blur shadow-sm">
        <p className="text-[9.5px] font-bold tracking-wider text-[var(--text-muted)] uppercase">Flow</p>
        <p className="mt-0.5 text-[12px] font-bold text-[var(--primary)]">흐름 설계</p>
      </div>
      <div className="absolute right-6 top-32 w-24 sm:w-28 rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#2563eb] px-3 py-2 shadow-[0_10px_22px_-10px_rgba(37,99,235,0.7)]">
        <p className="text-[9.5px] font-bold tracking-wider text-white/85 uppercase">Visual</p>
        <p className="mt-0.5 text-[12px] font-bold text-white">시각화</p>
      </div>
      <div className="absolute left-6 bottom-8 w-24 sm:w-28 rounded-xl bg-white/80 border border-[var(--border)] px-3 py-2 backdrop-blur shadow-sm">
        <p className="text-[9.5px] font-bold tracking-wider text-[var(--text-muted)] uppercase">User</p>
        <p className="mt-0.5 text-[12px] font-bold text-[var(--primary)]">사용자 경로</p>
      </div>
    </div>
  );
}

/* ============================================================
   5) Process
   ============================================================ */
function AboutProcess() {
  const steps = [
    { num: "01", name: "Discovery", body: "브랜드와 비즈니스 목적 파악" },
    { num: "02", name: "Structure", body: "정보 구조와 페이지 흐름 설계" },
    { num: "03", name: "Design", body: "UI/UX 및 비주얼 디자인" },
    { num: "04", name: "Build", body: "반응형 웹 구현 및 퍼블리싱" },
    { num: "05", name: "Improve", body: "운영 개선 및 콘텐츠 확장" },
  ];
  return (
    <section className="bg-[var(--bg-soft)] py-24 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle eyebrow="PROCESS" title="ASOG의 작업 방식" />

        <ol className="mt-14 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.num} className="relative rounded-[22px] border border-[var(--border)] bg-white p-6 card-hover">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-cyan)] text-white text-[13.5px] font-black tracking-wider">
                  {s.num}
                </span>
                <span className="text-eyebrow text-[var(--accent)]">STEP</span>
              </div>
              <h3 className="mt-4 text-[17px] sm:text-[18px] font-bold text-[var(--primary)]">{s.name}</h3>
              <p className="mt-2 text-[14px] text-[var(--text-soft)] leading-relaxed">{s.body}</p>

              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute right-[-12px] top-1/2 -translate-y-1/2 text-[var(--accent)]"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path
                      fillRule="evenodd"
                      d="M10.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================================================
   6) Closing CTA — 라이트 클리닉 톤
   ============================================================ */
function ClosingCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-clinic-deep py-24 sm:py-28 md:py-32 text-center">
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="orb orb-1 -z-10" style={{ width: 480, height: 480, top: -160, left: "10%" }} aria-hidden="true" />
      <div className="orb orb-2 -z-10" style={{ width: 480, height: 480, bottom: -200, right: "5%" }} aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-6">
        <h2 className="text-h2 text-[var(--primary)]">
          작은 브랜드도{" "}
          <span className="text-gradient">제대로 설계된 웹사이트</span>가 필요합니다
        </h2>
        <p className="mt-6 text-lead text-[var(--text-muted)]">
          ASOG는 대형 프로젝트에서 쌓은 기획과 디자인 기준을 소상공인, 스타트업, 개인 브랜드에 맞게 현실적으로 적용합니다.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/#contact"
            data-event="cta_about_closing_contact_click"
            className="inline-flex h-14 sm:h-[60px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] px-8 text-button text-white shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] hover:brightness-[1.05] transition-all"
          >
            프로젝트 문의하기
          </a>
          <a
            href="/#pricing"
            data-event="cta_about_closing_pricing_click"
            className="inline-flex h-14 sm:h-[60px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-white border border-[var(--border-strong)] px-7 text-button text-[var(--primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            서비스 가격 보기
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Icons (lightweight inline SVG)
   ============================================================ */
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M4 3h10a1 1 0 011 1v17H3V4a1 1 0 011-1zm14 6h3v12h-3V9zM6 6h2v2H6V6zm4 0h2v2h-2V6zM6 10h2v2H6v-2zm4 0h2v2h-2v-2zM6 14h2v2H6v-2zm4 0h2v2h-2v-2z" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4zm0 4.2L5 7.7V11c0 4.42 2.92 8.4 7 9.65 4.08-1.25 7-5.23 7-9.65V7.7l-7-2.5z" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M13 2L3 14h7v8l10-12h-7V2z" />
    </svg>
  );
}
