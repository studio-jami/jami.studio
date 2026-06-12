"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { ThemeToggle } from "@/components/system/theme-toggle";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function isStaticFile(href: string) {
  return /\.(txt|xml)$/.test(href);
}

/** A nav link that routes internal app paths through `next/link` and treats
 * generated text files / external URLs as anchors. */
function NavLink({
  href,
  children,
  onClick
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (isExternal(href) || isStaticFile(href)) {
    return (
      <a
        href={href}
        onClick={onClick}
        {...(isExternal(href) ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href as Route} onClick={onClick}>
      {children}
    </Link>
  );
}

/**
 * Kirimo header: a frosted, hairline-bordered bar with the wordmark/mark, the
 * primary nav, GitHub, and the theme toggle. On small viewports the nav collapses
 * into a full-screen overlay menu (the template's "Overlay Menu" move).
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the overlay is open (external-system sync). The overlay
  // closes via the nav-link onClick handlers, so no route-change effect is needed.
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-word">{site.name}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header-actions">
          <ThemeToggle />
          <button
            type="button"
            className="menu-trigger"
            aria-expanded={open}
            aria-controls="overlay-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-trigger-label">{open ? "Close" : "Menu"}</span>
            <span className={`menu-trigger-glyph ${open ? "is-open" : ""}`} aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div id="overlay-menu" className={`overlay-menu ${open ? "is-open" : ""}`} hidden={!open}>
        <nav className="overlay-nav" aria-label="Mobile">
          {site.nav.map((item, index) => (
            <NavLink key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <span className="overlay-index">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a
          className="overlay-contact"
          href={studioLinks.emailHref}
          onClick={() => setOpen(false)}
        >
          {site.email}
        </a>
      </div>
    </header>
  );
}
