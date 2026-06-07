"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export function AtlasHeader() {
  const pathname = usePathname();

  return (
    <header className="atlas-header">
      <div className="atlas-header-inner">
        <Link href="/" className="atlas-brand" aria-label="jami.studio home">
          <svg className="atlas-brand-mark" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="12" cy="3" r="1.5" fill="currentColor" opacity="0.6" />
            <circle cx="20" cy="16" r="1.5" fill="currentColor" opacity="0.5" />
            <circle cx="4" cy="16" r="1.5" fill="currentColor" opacity="0.5" />
          </svg>
          <span className="atlas-brand-wordmark">{site.name}</span>
        </Link>
        <nav className="atlas-nav" aria-label="Primary navigation">
          {site.nav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href.startsWith("/") && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "page" : undefined}
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