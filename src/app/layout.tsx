import type { Metadata } from "next";
import { Instrument_Sans, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { tokenCssVariables } from "@/tokens/css-vars";
import {
  defaultTheme,
  grainBlend,
  grainOpacity,
  noirThemes,
  type ThemeName
} from "@/tokens/theme";
import "@/styles/globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-instrument-sans"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-geist-mono"
});

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

/** Emit a token block for one theme as a CSS selector body, plus the grain vars. */
function themeBlock(selector: string, theme: ThemeName): string {
  const vars = tokenCssVariables(noirThemes[theme]);
  const entries = Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join("");
  return `${selector}{${entries}--grain-opacity:${grainOpacity[theme]};--grain-blend:${grainBlend[theme]};color-scheme:${theme};}`;
}

// :root carries the default (dark) theme; explicit data-theme selectors switch the CSS-var
// contract. Both themes ship full values — light is a designed twin, not an inversion.
const themeCss = [
  themeBlock(":root", defaultTheme),
  themeBlock('[data-theme="dark"]', "dark"),
  themeBlock('[data-theme="light"]', "light")
].join("\n");

// No-flash init: set data-theme from storage before first paint. Defaults to the lane's
// primary (dark) theme; honors a saved preference if present.
const noFlashScript = `(()=>{try{var t=localStorage.getItem('jami-theme');var v=(t==='light'||t==='dark')?t:'${defaultTheme}';document.documentElement.setAttribute('data-theme',v);}catch(e){document.documentElement.setAttribute('data-theme','${defaultTheme}');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  return (
    <html
      lang="en"
      data-theme={defaultTheme}
      className={`${instrumentSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
