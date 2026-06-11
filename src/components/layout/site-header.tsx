"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppLink } from "@/components/ui/app-link";
import { ThemeToggle } from "@/components/system/theme-toggle";
import { site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={["site-header", scrolled ? "is-scrolled" : ""].filter(Boolean).join(" ")}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="jami.studio home">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-cell" />
            <span className="brand-mark-cell" />
            <span className="brand-mark-cell" />
            <span className="brand-mark-cell" />
          </span>
          <span className="brand-word">{site.name}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {site.nav.map((item) => (
            <AppLink key={item.href} href={item.href}>
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="site-header-actions">
          <ThemeToggle />
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={["nav-toggle-bars", open ? "is-open" : ""].join(" ")} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={["mobile-menu", open ? "is-open" : ""].filter(Boolean).join(" ")}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          {site.nav.map((item) => (
            <AppLink key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </AppLink>
          ))}
        </nav>
        <Link className="mobile-menu-cta" href="/projects" onClick={() => setOpen(false)}>
          View projects
        </Link>
      </div>
    </header>
  );
}
