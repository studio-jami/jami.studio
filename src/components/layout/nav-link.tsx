import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

/**
 * Renders a content-layer href as the right element: internal app routes use
 * next/link; external URLs and generated text routes (e.g. /llms.txt, /robots.txt)
 * render as a plain anchor so typed-routes stays satisfied and feeds open directly.
 */
function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function isFileRoute(href: string): boolean {
  return /\.[a-z0-9]+$/i.test(href);
}

export function NavLink({
  href,
  children,
  className,
  onNavigate
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  if (isExternal(href)) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer noopener" onClick={onNavigate}>
        {children}
      </a>
    );
  }

  if (isFileRoute(href)) {
    return (
      <a className={className} href={href} onClick={onNavigate}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href as Route} onClick={onNavigate}>
      {children}
    </Link>
  );
}
