"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/layout/brand-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { site } from "@/content/site";

function isExternal(href: string) {
  return href.startsWith("http");
}

/**
 * Sticky header: wordmark + mark, primary nav from `site.nav`, theme toggle, and
 * a clean mobile menu sheet. Links resolve internal vs. external from the data.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Track the route the sheet was opened on; navigating away derives it closed
  // during render (no setState-in-effect needed for route changes).
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const isOpen = open && openedAt === pathname;

  // Lock scroll while the sheet is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  function toggleMenu() {
    setOpen((value) => {
      const next = !value;
      if (next) setOpenedAt(pathname);
      return next;
    });
  }

  return (
    <header className="site-header">
      <div className="site-header-inner container">
        <Link href="/" className="brand" aria-label="jami.studio home">
          <BrandMark />
          <span className="brand-word">{site.name}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {site.nav.map((item) =>
            isExternal(item.href) ? (
              <a key={item.href} href={item.href} className="site-nav-link" rel="noreferrer noopener">
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="site-nav-link"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="site-header-actions">
          <ThemeToggle />
          <Link href="/projects" className="btn btn--primary btn--md site-header-cta">
            <span className="btn-label">View work</span>
          </Link>
          <button
            type="button"
            className="menu-button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            <span className="menu-button-bar" data-open={isOpen} />
            <span className="menu-button-bar" data-open={isOpen} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="mobile-menu"
        data-open={isOpen}
        hidden={!isOpen}
      >
        <nav className="mobile-menu-nav" aria-label="Mobile">
          {site.nav.map((item) =>
            isExternal(item.href) ? (
              <a
                key={item.href}
                href={item.href}
                className="mobile-menu-link"
                rel="noreferrer noopener"
              >
                {item.label}
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <Link key={item.href} href={item.href} className="mobile-menu-link">
                {item.label}
              </Link>
            )
          )}
          <Link href="/projects" className="btn btn--primary btn--lg mobile-menu-cta">
            <span className="btn-label">View work</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
