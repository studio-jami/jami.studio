import type { Metadata } from "next";
import { fontClassNames } from "@/app/fonts";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { inlineCssVariables } from "@/tokens/css-vars";
import { fableDarkPreset, fableLightPreset } from "@/tokens/fable";
import "@/styles/globals.css";

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

/**
 * Theme wiring: the ASH & IRIS dark preset is the canvas default; the light
 * "print proof" preset rides the same CSS-variable contract under
 * [data-theme="light"]. Both blocks come from tokenCssVariables().
 */
const themeCss = [
  `:root{${inlineCssVariables(fableDarkPreset)}color-scheme:dark;}`,
  `:root[data-theme="light"]{${inlineCssVariables(fableLightPreset)}color-scheme:light;}`
].join("\n");

/**
 * Pre-paint theme resolution: explicit query param (testing) → stored
 * preference → OS preference → dark. Also flags JS availability so scroll
 * reveals never hide content for non-JS readers.
 */
const themeInit = `(function(){try{var q=new URLSearchParams(location.search).get("theme");var s=localStorage.getItem("jami-theme");var m=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";var t=(q==="light"||q==="dark")?q:(s==="light"||s==="dark")?s:m;document.documentElement.dataset.theme=t;document.documentElement.dataset.js="true";}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  return (
    <html lang="en" data-theme="dark" className={fontClassNames} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
