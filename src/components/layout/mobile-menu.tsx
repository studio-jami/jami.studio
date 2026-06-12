"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Route } from "next";

type NavItem = { label: string; href: string };

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Mobile navigation sheet. Hidden at desktop via CSS; the trigger appears only under the
 * tablet/phone breakpoints. Closes on Escape and locks body scroll while open.
 */
export function MobileMenu({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

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

  // The sheet is portaled to <body> so it escapes the header's backdrop-filter
  // containing block — otherwise `position: fixed` would resolve against the header,
  // not the viewport, clipping the sheet to the header's height.
  const sheet =
    open && typeof document !== "undefined"
      ? createPortal(
          <div className="mobile-menu-sheet" id={panelId} role="dialog" aria-modal="true">
            <nav aria-label="Primary" className="mobile-menu-nav">
              {items.map((item, index) =>
                isInternal(item.href) ? (
                  <Link key={item.href} href={item.href as Route} onClick={() => setOpen(false)}>
                    <span className="mobile-menu-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    <span className="mobile-menu-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                )
              )}
            </nav>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className="mobile-menu-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={`mobile-menu-bars${open ? " is-open" : ""}`} aria-hidden="true">
          <span />
          <span />
        </span>
        <span className="mobile-menu-trigger-label">{open ? "Close" : "Menu"}</span>
      </button>
      {sheet}
    </div>
  );
}
