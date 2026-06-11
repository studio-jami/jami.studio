import type { Metadata } from "next";
import { DM_Sans, Host_Grotesk, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GrainOverlay } from "@/components/system/grain-overlay";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { tokenCssVariables } from "@/tokens/css-vars";
import { darkPreset, grainOpacity, lightPreset } from "@/tokens/theme";
import "@/styles/globals.css";

// The template's real Google faces: Host Grotesk display + DM Sans body, with
// JetBrains Mono for code-ish eyebrows / section numbers. Self-hosted at build time
// via next/font (display: swap, Latin subset); each maps to a CSS variable consumed by
// the token preset font stacks.
const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-host-grotesk"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono"
});

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

function themeBlock(selector: string, preset: typeof darkPreset, grain: number): string {
  const vars = tokenCssVariables(preset);
  const body = Object.entries(vars)
    .map(([key, value]) => `${key}:${value};`)
    .join("");
  return `${selector}{${body}--grain-opacity:${grain};}`;
}

// Default theme is the cinematic dark prime; the light theme is opt-in via [data-theme].
const themeStyles = [
  themeBlock(":root", darkPreset, grainOpacity.dark),
  themeBlock(':root[data-theme="light"]', lightPreset, grainOpacity.light)
].join("\n");

// No-flash theme init: applies a stored choice (defaulting to dark) before first paint
// so the chosen theme is correct on the very first frame.
const themeInit = `(function(){try{var t=localStorage.getItem("jami-theme");document.documentElement.dataset.theme=(t==="light")?"light":"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${hostGrotesk.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
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
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="page-shell">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
