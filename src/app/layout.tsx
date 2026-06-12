import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Atmosphere } from "@/components/system/atmosphere";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeScript } from "@/components/theme/theme-script";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { tokenCssVariables } from "@/tokens/css-vars";
import { synkDarkPreset, synkLightPreset } from "@/tokens/theme";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono"
});

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

function cssVarBlock(selector: string, vars: Record<string, string>) {
  const body = Object.entries(vars)
    .map(([key, value]) => `${key}:${value};`)
    .join("");
  return `${selector}{${body}}`;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  // Light is the default :root; dark overrides under [data-theme="dark"].
  // The no-flash ThemeScript sets data-theme before paint.
  const themeCss = [
    cssVarBlock(":root", tokenCssVariables(synkLightPreset)),
    cssVarBlock('[data-theme="dark"]', tokenCssVariables(synkDarkPreset))
  ].join("\n");

  const fontClass = `${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`;

  return (
    <html lang="en" data-theme="light" className={fontClass} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Atmosphere />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
