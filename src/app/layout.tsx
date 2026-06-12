import type { Metadata } from "next";
import { DM_Sans, Host_Grotesk, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Atmosphere } from "@/components/system/atmosphere";
import { ThemeScript } from "@/components/system/theme-script";
import { ThemeStyle } from "@/components/system/theme-style";
import { site } from "@/content/site";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import "@/styles/globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-host-grotesk",
  display: "swap"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];
  const fontVars = `${hostGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`;

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <ThemeStyle />
        <ThemeScript />
      </head>
      <body className={fontVars}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Atmosphere />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="app-shell">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
