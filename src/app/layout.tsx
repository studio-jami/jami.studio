import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GrainOverlay } from "@/components/system/grain-overlay";
import { Reveal } from "@/components/system/reveal";
import { ThemeScript } from "@/components/system/theme-script";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { inlineCssVariables } from "@/tokens/css-vars";
import { darkPreset, lightPreset } from "@/tokens/theme";
import "@/styles/globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-geist-mono"
});

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

// Dark is the default character (lane A); light is the `[data-theme="light"]` block.
// Both are emitted from the same `tokenCssVariables()` contract so every component
// consumes one set of var names across themes.
const themeStyles = `:root{${inlineCssVariables(darkPreset)}}
[data-theme="light"]{${inlineCssVariables(lightPreset)}}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  return (
    <html
      lang="en"
      data-theme="dark"
      className={`no-js ${instrumentSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <ThemeScript />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GrainOverlay />
        <div className="app-shell">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
        <Reveal />
      </body>
    </html>
  );
}
