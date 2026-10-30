import type { Metadata } from "next";
import {
  Big_Shoulders,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Instrument_Serif,
} from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BackToTop from "@/components/BackToTop";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, SOCIAL } from "@/lib/site";
import ScrollReset from "@/components/ScrollReset";
import CookieBanner from "@/components/CookieBanner";
import ProjectNote from "@/components/ProjectNote";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["800", "900"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rep Theory | Lifting Straps, Wrist Wraps & Training Programs",
    template: "%s | Rep Theory",
  },
  description:
    "Custom lifting straps, wrist wraps, cable attachments and 12-week training programs, built for the last rep. Designed in Waterloo, Ontario. Prices in CAD.",
  keywords: [
    "lifting straps",
    "custom lifting straps",
    "wrist wraps",
    "gym accessories Canada",
    "hypertrophy program",
    "strength training",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      data-scroll-behavior="smooth"
      className={`${bigShoulders.variable} ${plexSans.variable} ${plexMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/icon.svg`,
            email: "hello@reptheory.ca",
            sameAs: SOCIAL.flatMap((s) => (s.url ? [s.url] : [])),
          }}
        />
        <ScrollReset />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <BackToTop />
        <ProjectNote />
        <CookieBanner />
        <SiteFooter />
      </body>
    </html>
  );
}
