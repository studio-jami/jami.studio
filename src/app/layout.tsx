import type { Metadata } from "next";
import { Onest, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GrainOverlay } from "@/components/system/grain-overlay";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { tokenCssVariables } from "@/tokens/css-vars";
import { darkPreset, lightPreset } from "@/tokens/theme";
import "@/styles/globals.css";

const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest",
  weight: ["400", "500", "600", "700", "800"]
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

function themeBlock(selector: string, preset: Parameters<typeof tokenCssVariables>[0]) {
  const body = Object.entries(tokenCssVariables(preset))
    .map(([key, value]) => `${key}:${value};`)
    .join("");
  return `${selector}{${body}}`;
}

// Default theme is light (the lane's primary character); the no-flash script promotes a stored or
// system preference before first paint so the chosen theme is correct on the very first frame.
const THEME_INIT = `(function(){try{var s=localStorage.getItem('jami-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='dark'||s==='light'?s:(m?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

const themeStyles = [
  `:root{color-scheme:light;${Object.entries(tokenCssVariables(lightPreset))
    .map(([k, v]) => `${k}:${v};`)
    .join("")}--grain-opacity:0.022;--grain-blend:multiply;--accent-soft:color-mix(in srgb, var(--accent) 12%, transparent);--accent-line:color-mix(in srgb, var(--accent) 28%, var(--border));--hairline:color-mix(in srgb, var(--foreground) 12%, transparent);}`,
  themeBlock('[data-theme="light"]', lightPreset) +
    `[data-theme="light"]{color-scheme:light;--grain-opacity:0.022;--grain-blend:multiply;--accent-soft:color-mix(in srgb, var(--accent) 12%, transparent);--accent-line:color-mix(in srgb, var(--accent) 28%, var(--border));--hairline:color-mix(in srgb, var(--foreground) 12%, transparent);}`,
  themeBlock('[data-theme="dark"]', darkPreset) +
    `[data-theme="dark"]{color-scheme:dark;--grain-opacity:0.05;--grain-blend:soft-light;--accent-soft:color-mix(in srgb, var(--accent) 18%, transparent);--accent-line:color-mix(in srgb, var(--accent) 42%, var(--border));--hairline:color-mix(in srgb, var(--foreground) 14%, transparent);}`
].join("");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  return (
    <html lang="en" data-theme="light" className={`${onest.variable} ${jetbrainsMono.variable}`}>
      <head>
        <style id="jami-theme-vars" dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <GrainOverlay />
        <div className="page-shell">
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
