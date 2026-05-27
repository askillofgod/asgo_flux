import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/data/site";

const SITE_URL = SITE.url;
const OG_IMAGE = `${SITE_URL}${SITE.ogImage}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.metaTitle,
    template: `%s | ${SITE.brandShort}`,
  },
  description: SITE.metaDescription,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE.name,
    title: SITE.metaTitle,
    description: SITE.metaDescription,
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.metaTitle,
    description: SITE.metaDescription,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, email: true, address: false },
  category: "business",
  verification: {
    google: "hXQCTw2WCh6Synes72w45_V_B5MytC9Tk3ELnFqD2dY",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#04060f" },
    { media: "(prefers-color-scheme: dark)", color: "#04060f" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-[var(--text)] antialiased">
        {children}
      </body>
    </html>
  );
}
