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
            <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
            <circle cx="12" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
            <circle cx="12" cy="12" r="3.25" fill="currentColor" />
            <circle cx="12" cy="12" r="1.25" fill="currentColor" opacity="0.45" />
            <circle cx="12" cy="3.5" r="1.25" fill="currentColor" opacity="0.55" />
            <circle cx="19.5" cy="16.5" r="1.25" fill="currentColor" opacity="0.45" />
            <circle cx="4.5" cy="16.5" r="1.25" fill="currentColor" opacity="0.45" />
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