import Link from "next/link";
import type { Route } from "next";
import { site } from "@/content/site";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemeToggle } from "@/components/system/theme-toggle";

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * NavBar → SiteHeader, Noir's centered floating pill stack: one wide brand pill with the
 * wordmark centered, and a row of outlined nav pills beneath it. At tablet/phone widths the
 * stack collapses to brand pill + menu pill (sheet). All hrefs come from `site.nav`.
 */
export function SiteHeader() {
  const navItems = [{ label: "Home", href: "/" }, ...site.nav];

  return (
    <header className="site-header">
      <div className="site-header-stack">
        <Link href="/" className="header-pill brand-pill" aria-label={`${site.name} home`}>
          {site.name}
        </Link>

        <nav className="site-nav-row" aria-label="Primary">
          {navItems.map((item) =>
            isInternal(item.href) ? (
              <Link key={item.href} href={item.href as Route} className="header-pill nav-pill">
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="header-pill nav-pill"
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            )
          )}
          <ThemeToggle />
          <MobileMenu items={navItems} />
        </nav>
      </div>
    </header>
  );
}
