import Link from "next/link";
import type { Route } from "next";
import { ThemeToggle } from "@/components/system/theme-toggle";
import { site } from "@/content/site";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Sticky site header: wordmark + `site.nav` + theme toggle, with a mobile sheet under
 * the breakpoint. All hrefs come from `site.nav`; nothing is hand-built here.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Logo />
        <nav className="site-nav" aria-label="Primary navigation">
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
                rel="noreferrer noopener"
              >
                {item.label}
              </a>
            )
          )}
        </nav>
        <div className="site-header-actions">
          <ThemeToggle />
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
