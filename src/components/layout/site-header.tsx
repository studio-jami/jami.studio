"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

function isInternalPage(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  return !/\.(txt|xml)$/.test(href);
}

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  if (isInternalPage(href)) {
    return (
      <Link href={href as Route} onClick={onClick}>
        {label}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {label}
    </a>
  );
}

/**
 * Synk header: brand left, nav centered, white pill CTA right — over a
 * blurred near-black bar with a hairline bottom seam.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label={`${site.name} home`}>
            <span className="brand-mark" aria-hidden="true" />
            <span>{site.name}</span>
          </Link>

          <nav className="header-nav" aria-label="Primary">
            {site.nav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <ButtonLink
              href={site.home.primaryCta.href}
              variant="primary"
              className="btn-sm header-cta"
            >
              {site.home.primaryCta.label}
            </ButtonLink>
            <button
              type="button"
              className="icon-btn header-menu-btn"
              aria-expanded={open}
              aria-controls="header-sheet"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span aria-hidden="true">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        <div className="header-sheet" id="header-sheet" data-open={open}>
          {site.nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={() => setOpen(false)}
            />
          ))}
          <NavLink
            href={site.home.primaryCta.href}
            label={site.home.primaryCta.label}
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
