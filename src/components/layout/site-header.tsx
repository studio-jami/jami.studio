import Link from "next/link";
import type { Route } from "next";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/system/theme-toggle";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SparkIcon } from "@/components/ui/icons";

function isExternal(href: string) {
  return /^https?:/.test(href);
}

/** Brand — the template's sparkle glyph + wordmark. */
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label={`${site.name} home`}>
      <span className="brand-mark" aria-hidden="true">
        <SparkIcon size={18} />
      </span>
      <span className="brand-word">{site.name}</span>
    </Link>
  );
}

/** Renders a nav entry as a Link for internal routes, an anchor for external. */
export function NavLink({ href, label }: { href: string; label: string }) {
  if (isExternal(href)) {
    return (
      <a href={href} className="nav-link" target="_blank" rel="noreferrer noopener">
        {label}
        <span className="nav-link-ext" aria-hidden="true">
          ↗
        </span>
      </a>
    );
  }
  return (
    <Link href={href as Route} className="nav-link">
      {label}
    </Link>
  );
}

/**
 * SiteHeader — the template's floating nav: brand at left, muted links in the
 * middle, and an emphasized primary action at right (our `primaryCta`), with
 * the theme toggle alongside. Transparent over the photographic hero;
 * a blurred warm-black wash keeps it legible while scrolling.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Brand />
        <nav className="site-nav" aria-label="Primary">
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
        <div className="site-header-actions">
          <Link href={site.home.primaryCta.href as Route} className="nav-cta">
            {site.home.primaryCta.label}
          </Link>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
