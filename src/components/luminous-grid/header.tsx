"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export function LuminousHeader() {
  const pathname = usePathname();

  return (
    <header className="lg-header">
      <div className="lg-header-inner">
        <Link href="/" className="lg-brand" aria-label="jami.studio home">
          <span className="lg-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="7" height="7" rx="2" fill="currentColor" opacity="0.3" />
              <rect x="11" y="2" width="7" height="7" rx="2" fill="currentColor" opacity="0.5" />
              <rect x="2" y="11" width="7" height="7" rx="2" fill="currentColor" opacity="0.5" />
              <rect x="11" y="11" width="7" height="7" rx="2" fill="currentColor" />
            </svg>
          </span>
          <span className="lg-brand-text">{site.name}</span>
        </Link>
        <nav className="lg-nav" aria-label="Primary navigation">
          {site.nav.map((item) => {
            const isInternal = item.href.startsWith("/");
            const isActive =
              isInternal &&
              (pathname === item.href || pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "lg-nav-link lg-nav-link--active" : "lg-nav-link"}
                {...(isActive ? { "aria-current": "page" as const } : {})}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}