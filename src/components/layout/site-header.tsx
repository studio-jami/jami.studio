import Link from "next/link";
import type { Route } from "next";
import { BrandMark, Wordmark } from "@/components/layout/brand-mark";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { site } from "@/content/site";

function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header-row">
        <Link href="/" className="wordmark" aria-label={`${site.name} home`}>
          <BrandMark />
          <Wordmark text={site.name} />
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {site.nav.map((item) =>
            isExternal(item.href) ? (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
                <span aria-hidden="true"> ↗</span>
              </a>
            ) : (
              <Link key={item.href} href={item.href as Route}>
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="site-actions">
          <ThemeToggle />
          <MobileMenu items={[...site.nav]} />
        </div>
      </div>
    </header>
  );
}
