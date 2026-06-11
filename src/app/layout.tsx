import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GrainOverlay } from "@/components/system/grain-overlay";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { tokenCssVariables } from "@/tokens/css-vars";
import { darkPreset, grainOpacity, lightPreset } from "@/tokens/theme";
import { jakarta, mono } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

function themeVarBlock(selector: string, preset: typeof darkPreset, grain: number): string {
  const vars = tokenCssVariables(preset);
  const body = Object.entries(vars)
    .map(([key, value]) => `${key}:${value};`)
    .join("");
  return `${selector}{${body}--grain-opacity:${grain};}`;
}

// Both theme var blocks are emitted once, server-side. Dark is the default identity, so
// it lives on :root; light overrides under [data-theme="light"]. The contract var names
// come straight from tokenCssVariables() — no component invents a var.
const themeStyles = [
  themeVarBlock(":root,[data-theme='dark']", darkPreset, grainOpacity.dark),
  themeVarBlock("[data-theme='light']", lightPreset, grainOpacity.light)
].join("\n");

// No-flash theme init: runs before paint, applies the stored/system theme so the first
// frame already matches. Also marks the root as JS-enabled (`.js`) so the scroll-reveal
// hidden state only applies when JS can actually reveal it — without JS (and for static
// HTML / AI readers) all content stays fully visible. Kept tiny and dependency-free.
const themeInit = `(function(){var d=document.documentElement;d.classList.add('js');try{var s=localStorage.getItem('jami-theme');var t=s==='light'||s==='dark'?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');d.setAttribute('data-theme',t);}catch(e){d.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  return (
    <html lang="en" data-theme="dark" className={`${jakarta.variable} ${mono.variable}`}>
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
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="page-shell">
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
