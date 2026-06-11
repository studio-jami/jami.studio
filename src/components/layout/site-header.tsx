"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/system/theme-toggle";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";
import { NavLink } from "./nav-link";
import { Wordmark } from "./wordmark";
import styles from "./site-header.module.css";

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

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ""].filter(Boolean).join(" ")}>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>
      <span className={styles.bg} aria-hidden="true" />
      <div className={styles.inner}>
        <Wordmark onNavigate={close} />

        <nav className={styles.desktopNav} aria-label="Primary">
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <span className={styles.ctaDesktop}>
            <Button href={site.home.primaryCta.href} variant="primary" size="md">
              {site.home.primaryCta.label}
            </Button>
          </span>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={[styles.bar, open ? styles.barTop : ""].filter(Boolean).join(" ")} />
            <span className={[styles.bar, open ? styles.barMid : ""].filter(Boolean).join(" ")} />
            <span className={[styles.bar, open ? styles.barBot : ""].filter(Boolean).join(" ")} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={[styles.sheet, open ? styles.sheetOpen : ""].filter(Boolean).join(" ")}
        hidden={!open}
      >
        <nav className={styles.sheetNav} aria-label="Mobile">
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href} className={styles.sheetLink} onNavigate={close}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.sheetCta}>
          <Button href={site.home.primaryCta.href} variant="primary" size="lg" className={styles.fullWidth}>
            {site.home.primaryCta.label}
          </Button>
          <Button
            href={studioLinks.githubOrg}
            variant="secondary"
            size="lg"
            external
            withArrow
            className={styles.fullWidth}
          >
            GitHub
          </Button>
        </div>
      </div>
      {open ? <button type="button" className={styles.scrim} aria-hidden="true" tabIndex={-1} onClick={close} /> : null}
    </header>
  );
}
