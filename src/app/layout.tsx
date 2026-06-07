import type { Metadata } from "next";
import { DM_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { AtlasFooter } from "@/components/rerun-a/atlas-footer";
import { AtlasHeader } from "@/components/rerun-a/atlas-header";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { inlineCssVariables } from "@/tokens/css-vars";
import { rerunAObsidianAtlasPreset } from "@/tokens/presets";
import "@/styles/globals.css";
import "@/styles/direction-rerun-a.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-stack",
  display: "swap"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans-stack",
  display: "swap"
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-stack",
  display: "swap"
});

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];
  const themeVars = inlineCssVariables(rerunAObsidianAtlasPreset);

  return (
    <html
      lang="en"
      data-direction="rerun-a"
      className={`${fraunces.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <style>{`:root {${themeVars}}`}</style>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AtlasHeader />
        <main>{children}</main>
        <AtlasFooter />
      </body>
    </html>
  );
}