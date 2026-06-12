"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { site } from "@/content/site";

function isExternal(href: string) {
  return /^https?:/.test(href);
}

/**
 * Mobile navigation sheet. Hidden on desktop via CSS; on small screens it opens
 * a full-height panel with the same `site.nav` entries. Closes on Escape and
 * locks body scroll while open.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className="mobile-menu-trigger"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="mobile-menu-bars" data-open={open} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      {open ? (
        <div className="mobile-menu-overlay" role="presentation" onClick={() => setOpen(false)}>
          <nav
            id="mobile-menu-panel"
            className="mobile-menu-panel"
            aria-label="Primary"
            onClick={(event) => event.stopPropagation()}
          >
            {site.nav.map((item) =>
              isExternal(item.href) ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="mobile-menu-link"
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  className="mobile-menu-link"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
