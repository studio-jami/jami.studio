import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { geminiDarkPreset, geminiLightPreset } from "@/tokens/presets";
import { inlineCssVariables } from "@/tokens/css-vars";
import "@/styles/globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const fontDisplay = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap"
});

const fontMono = JetBrains_Mono({
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
  const darkVars = inlineCssVariables(geminiDarkPreset);
  const lightVars = inlineCssVariables(geminiLightPreset);

  return (
    <html lang="en" suppressHydrationWarning className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}>
      <head>
        <ThemeScript />
        <style>{`
          :root {
            ${lightVars}
          }
          :root[data-theme="dark"] {
            ${darkVars}
          }
        `}</style>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <div className="grain-overlay" aria-hidden="true" />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
