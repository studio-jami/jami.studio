import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GrainOverlay } from "@/components/system/grain-overlay";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { inlineCssVariables } from "@/tokens/css-vars";
import { darkPreset, lightPreset } from "@/tokens/theme";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"]
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

// Emit both presets to the same CSS-var contract: light on :root, dark under
// [data-theme="dark"]. Components only ever read the vars, never a preset.
const themeStyles = `:root {
${inlineCssVariables(lightPreset)}
--grain-opacity: 0.022;
--grain-blend: multiply;
}
[data-theme="dark"] {
${inlineCssVariables(darkPreset)}
--grain-opacity: 0.05;
--grain-blend: soft-light;
}`;

// No-flash theme init: resolve stored choice (else system preference) and set the
// attribute before first paint so the correct preset is live immediately.
const themeInit = `(function(){try{var k="jami-studio-theme";var s=localStorage.getItem(k);var t=s==="dark"||s==="light"?s:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="light";}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  return (
    <html lang="en" data-theme="light" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GrainOverlay />
        <div className="site-shell">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
