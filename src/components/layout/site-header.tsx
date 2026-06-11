"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/system/theme-toggle";
import { CloseIcon, GithubIcon, MenuIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" onClick={onClick}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href as Route} onClick={onClick}>
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open (updating an external system, not React state).
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Dialog a11y: move focus into the open sheet, close on Escape, and restore focus to the trigger.
  useEffect(() => {
    if (!menuOpen) return;
    const trigger = menuTriggerRef.current;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [menuOpen]);

  return (
    <header className="site-header" data-scrolled={scrolled ? "true" : "false"}>
      <div className="site-header-inner container">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <span className="brand-mark" aria-hidden="true" />
          <span>{site.name}</span>
        </Link>

        <div className="header-desktop">
          <nav className="header-nav" aria-label="Primary">
            {site.nav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <Button href={site.home.primaryCta.href} variant="primary" icon="arrow">
              {site.home.primaryCta.label}
            </Button>
          </div>
        </div>

        <div className="header-mobile">
          <ThemeToggle />
          <button
            ref={menuTriggerRef}
            type="button"
            className="menu-button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-sheet" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="mobile-sheet-top container" style={{ padding: 0 }}>
            <Link href="/" className="brand" aria-label={`${site.name} home`}>
              <span className="brand-mark" aria-hidden="true" />
              <span>{site.name}</span>
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              className="menu-button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Mobile">
            {site.nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </nav>
          <div className="mobile-sheet-footer">
            <Button href={site.home.primaryCta.href} variant="primary" block icon="arrow">
              {site.home.primaryCta.label}
            </Button>
            <Button href={studioLinks.githubOrg} variant="secondary" block icon="external">
              <GithubIcon /> GitHub
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
