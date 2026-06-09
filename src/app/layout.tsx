import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GrainOverlay } from "@/components/system/grain-overlay";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { inlineCssVariables } from "@/tokens/css-vars";
import { getPreset } from "@/tokens/nocturne";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap"
});

const geistDisplay = Geist({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap"
});

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

// No-flash theme bootstrap: sets data-theme before first paint.
const themeBootstrap = `
(function() {
  try {
    var stored = localStorage.getItem('jami-theme');
    var theme = (stored === 'light' || stored === 'dark') ? stored : (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  } catch (e) {}
})();
`.trim();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  // Emit BOTH theme presets as CSS-var blocks so the [data-theme] switch (set
  // before paint by themeBootstrap) actually re-skins the whole surface, not
  // just the grain/atmosphere. Dark is the default on :root; light overrides
  // when [data-theme="light"] is present.
  const darkVars = inlineCssVariables(getPreset("dark"));
  const lightVars = inlineCssVariables(getPreset("light"));
  const themeCss = `:root,[data-theme="dark"]{${darkVars}}[data-theme="light"]{${lightVars}}`;

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${geistDisplay.variable}`}>
      <head>
        <style>{themeCss}</style>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GrainOverlay />
        <SiteHeader />
        <main style={{ position: "relative", zIndex: 1 }}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
