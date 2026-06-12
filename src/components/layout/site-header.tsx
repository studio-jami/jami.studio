"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { ThemeToggle } from "@/components/system/theme-toggle";
import { site } from "@/content/site";

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  if (isInternal(href)) {
    return (
      <Link href={href as Route} className="nav-link" onClick={onClick}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className="nav-link" target="_blank" rel="noreferrer" onClick={onClick}>
      {label}
      <span className="nav-link-ext" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-header-inner container">
        <Link
          href="/"
          className="brand"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-dot" />
          </span>
          <span className="brand-word">{site.name}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="site-header-actions">
          <ThemeToggle />
          <button
            type="button"
            className="menu-trigger"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-trigger-bars" data-open={open} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div className="mobile-nav" id="mobile-nav" data-open={open} hidden={!open}>
        <nav aria-label="Mobile">
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} onClick={() => setOpen(false)} />
          ))}
        </nav>
      </div>
    </header>
  );
}
