"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { SmartLink } from "@/components/ui/smart-link";
import { ThemeToggle } from "@/components/system/theme-toggle";
import { site } from "@/content/site";

/**
 * Sticky pill header: wordmark + primary nav (Projects, AI index, GitHub) + theme toggle,
 * collapsing to a menu/sheet under 880px. All hrefs come from `site.nav`; the GitHub CTA
 * is the studio org link from the content layer. Interactive leaf (sheet + toggle), so the
 * whole bar is a client component.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const githubHref = site.nav.find((item) => item.label === "GitHub")?.href ?? site.social[0].href;

  return (
    <header className="site-header">
      <Container>
        <div className="site-header-inner">
          <SmartLink href="/" className="brand" aria-label={`${site.name} home`}>
            <span className="brand-mark" aria-hidden="true" />
            <span>{site.name}</span>
          </SmartLink>

          <nav className="header-nav" aria-label="Primary">
            <div className="header-nav-links">
              {site.nav.map((item) => (
                <SmartLink key={item.href} href={item.href}>
                  {item.label}
                </SmartLink>
              ))}
            </div>
            <div className="header-actions">
              <ThemeToggle />
              <Button href={githubHref} variant="secondary" className="header-cta">
                GitHub
              </Button>
              <button
                type="button"
                className="menu-toggle"
                aria-expanded={open}
                aria-controls="mobile-sheet"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((value) => !value)}
              >
                <MenuIcon open={open} />
              </button>
            </div>
          </nav>
        </div>

        <div id="mobile-sheet" className={open ? "mobile-sheet is-open" : "mobile-sheet"}>
          <div className="mobile-sheet-inner">
            {site.nav.map((item) => (
              <SmartLink key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </SmartLink>
            ))}
          </div>
        </div>
      </Container>
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
      {open ? (
        <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
      ) : (
        <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
      )}
    </svg>
  );
}
