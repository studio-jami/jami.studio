"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useId, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

/** Compact disclosure menu for narrow viewports. */
export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className="menu-button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="menu-button-label">{open ? "Close" : "Menu"}</span>
        <span className="menu-button-icon" aria-hidden="true" data-open={open || undefined}>
          <span />
          <span />
        </span>
      </button>
      <nav
        id={panelId}
        className="menu-panel"
        data-open={open || undefined}
        aria-label="Mobile navigation"
      >
        <ul>
          {items.map((item, index) => (
            <li key={item.href}>
              <span className="menu-no">{String(index + 1).padStart(2, "0")}</span>
              {isExternal(item.href) ? (
                <a href={item.href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                  {item.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              ) : (
                <Link href={item.href as Route} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
