import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { LuminousFooter } from "@/components/luminous-grid/footer";
import { LuminousHeader } from "@/components/luminous-grid/header";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { luminousGridPreset } from "@/tokens/presets";
import { inlineCssVariables } from "@/tokens/css-vars";
import "@/styles/globals.css";
import "@/styles/luminous-grid.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];
  const themeVars = inlineCssVariables(luminousGridPreset);

  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <head>
        <style>{`:root {${themeVars}}`}</style>
      </head>
      <body className="lg-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LuminousHeader />
        <main className="lg-main">{children}</main>
        <LuminousFooter />
      </body>
    </html>
  );
}