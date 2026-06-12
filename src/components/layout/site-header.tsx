import Link from "next/link";
import type { Route } from "next";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";
import { Container } from "@/components/layout/container";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemeToggle } from "@/components/system/theme-toggle";

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/** NavBar → SiteHeader. Wordmark + framed mark, primary nav, GitHub, theme toggle, mobile sheet. */
export function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="site-header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-word">{site.name}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {site.nav.map((item) =>
            isInternal(item.href) ? (
              <Link key={item.href} href={item.href as Route} className="site-nav-link">
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="site-nav-link"
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="site-header-actions">
          <ThemeToggle />
          <a
            className="header-cta"
            href={studioLinks.githubOrg}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <MobileMenu items={site.nav} />
        </div>
      </Container>
    </header>
  );
}
