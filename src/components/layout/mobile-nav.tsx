"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/system/theme-toggle";
import { site } from "@/content/site";

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Mobile menu sheet. The trigger and overlay only appear under the mobile breakpoint via
 * CSS; nav content mirrors `site.nav` exactly (no duplicate source of truth). Closes on
 * route intent, Escape, and overlay click; locks body scroll while open.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav-trigger"
        aria-expanded={open}
        aria-controls="mobile-nav-sheet"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className={`mobile-nav-icon${open ? " is-open" : ""}`} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      {open ? (
        <div className="mobile-nav-overlay" onClick={() => setOpen(false)} aria-hidden="true" />
      ) : null}

      <div
        id="mobile-nav-sheet"
        className={`mobile-nav-sheet${open ? " is-open" : ""}`}
        hidden={!open}
      >
        <nav aria-label="Mobile navigation">
          {site.nav.map((item) =>
            isInternal(item.href) ? (
              <Link key={item.href} href={item.href as Route} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
        </nav>
        <div className="mobile-nav-footer">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
