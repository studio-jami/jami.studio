"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { site } from "@/content/site";

function isInternal(href: string) {
  return href.startsWith("/") && !href.includes(".");
}

function NavItem({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  if (isInternal(href)) {
    return (
      <Link href={href as Route} className="nav__link" onClick={onClick}>
        {label}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className="nav__link"
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {label}
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="jami.studio — home">
          <span className="brand__mark" aria-hidden="true">
            <span className="brand__glyph" />
          </span>
          <span className="brand__word">
            jami<span className="brand__dot">.</span>studio
          </span>
        </Link>

        <nav className="nav nav--desktop" aria-label="Primary">
          {site.nav.map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="site-header__actions">
          <ThemeToggle />
          <button
            type="button"
            className="nav__toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav__toggle-bar" data-open={open} />
            <span className="nav__toggle-bar" data-open={open} />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`mobile-nav${open ? " mobile-nav--open" : ""}`}
        hidden={!open}
      >
        <nav className="mobile-nav__list" aria-label="Mobile">
          {site.nav.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}
