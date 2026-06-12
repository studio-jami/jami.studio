import type { Metadata } from "next";
import { JetBrains_Mono, Onest } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Atmosphere } from "@/components/system/atmosphere";
import { ThemeScript } from "@/components/system/theme-script";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { nouvaDarkPreset, nouvaLightPreset } from "@/tokens/theme";
import { tokenCssVariables } from "@/tokens/css-vars";
import "@/styles/globals.css";

const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono"
});

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

function themeBlock(selector: string, vars: Record<string, string>) {
  const body = Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join("");
  return `${selector}{${body}}`;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];
  const lightVars = tokenCssVariables(nouvaLightPreset);
  const darkVars = tokenCssVariables(nouvaDarkPreset);
  const themeCss = [
    themeBlock(':root, [data-theme="light"]', lightVars),
    themeBlock('[data-theme="dark"]', darkVars)
  ].join("");

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        <ThemeScript />
      </head>
      <body className={`${onest.variable} ${jetbrainsMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Atmosphere />
        <div className="page-shell">
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
