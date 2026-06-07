import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SignalForgeFooter } from "@/components/signal-forge/site-footer";
import { SignalForgeHeader } from "@/components/signal-forge/site-header";
import { ForgeMesh } from "@/components/signal-forge/forge-mesh";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import { signalForgePreset } from "@/tokens/presets";
import { inlineCssVariables } from "@/tokens/css-vars";
import "@/styles/globals.css";
import "@/styles/signal-forge.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap"
});

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];
  const themeVars = inlineCssVariables(signalForgePreset);

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <style>{`:root {${themeVars}}`}</style>
      </head>
      <body>
        <ForgeMesh />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SignalForgeHeader />
        <main>{children}</main>
        <SignalForgeFooter />
      </body>
    </html>
  );
}