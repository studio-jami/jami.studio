import type { Metadata } from "next";
import { JetBrains_Mono, Onest } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
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
  const darkVars = tokenCssVariables(nouvaDarkPreset);
  const lightVars = tokenCssVariables(nouvaLightPreset);
  // Dark is the lane's primary character, so it owns `:root`. Light is opt-in via the
  // theme toggle / OS preference and overrides through `[data-theme="light"]`.
  const themeCss = [
    themeBlock(':root, [data-theme="dark"]', darkVars),
    themeBlock('[data-theme="light"]', lightVars)
  ].join("");

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        <ThemeScript />
      </head>
      <body className={`${onest.variable} ${jetbrainsMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="page-shell">
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
