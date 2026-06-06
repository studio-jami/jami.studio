import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { directionBResearchLabPreset } from "@/tokens/presets";
import { inlineCssVariables } from "@/tokens/css-vars";
import "@/styles/globals.css";

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];
  const themeVars = inlineCssVariables(directionBResearchLabPreset);

  return (
    <html lang="en">
      <head>
        <style>{`:root {${themeVars}}`}</style>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
