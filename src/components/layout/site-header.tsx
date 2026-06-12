"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/system/theme-toggle";
import { SmartLink } from "@/components/ui/smart-link";

/**
 * Kirimo header: wordmark left, sparse uppercase nav right, hairline rule
 * below. The nav collapses into a full-width sheet at tablet/mobile widths.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <SmartLink href="/" className="site-header__brand" aria-label="jami.studio — home" onClick={close}>
          jami<span className="site-header__brand-dot">.</span>studio
        </SmartLink>

        <nav className="site-header__nav" aria-label="Primary">
          <ul>
            {site.nav.map((item) => (
              <li key={item.href}>
                <SmartLink href={item.href} className="site-header__link">
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <ThemeToggle />
          <button
            type="button"
            className="site-header__menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="site-header__sheet" hidden={!open}>
        <nav aria-label="Primary, mobile">
          <ul>
            {site.nav.map((item, index) => (
              <li key={item.href}>
                <SmartLink href={item.href} className="site-header__sheet-link" onClick={close}>
                  <span className="site-header__sheet-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
