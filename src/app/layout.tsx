import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeScript } from "@/components/theme/theme-script";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { tokenCssVariables } from "@/tokens/css-vars";
import { synkDarkPreset, synkLightPreset } from "@/tokens/theme";
import "@/styles/globals.css";

// Synk is Inter-only (400/500/600/700). The preset's font stacks resolve
// through --font-inter, defined here by next/font.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
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

  // Dark is the primary Synk theme: :root carries dark values, light overrides
  // under [data-theme="light"]. The no-flash ThemeScript sets data-theme pre-paint.
  const themeCss = [
    cssVarBlock(":root", tokenCssVariables(synkDarkPreset)),
    cssVarBlock('[data-theme="light"]', tokenCssVariables(synkLightPreset))
  ].join("\n");

  return (
    <html lang="en" data-theme="dark" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
