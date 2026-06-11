import Link from "next/link";
import type { Route } from "next";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type SmartLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:");
}

/**
 * One link primitive for the whole site. Internal page routes go through next/link
 * (prefetch, client nav); external URLs, mailto, and generated text routes
 * (`/llms.txt`, `/robots.txt`, `/sitemap.xml`) render as a plain anchor. All hrefs
 * are passed in already-resolved from the content/route layer — never hand-built here.
 */
export function SmartLink({ href, children, className, ...rest }: SmartLinkProps) {
  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer noopener"
        {...rest}
      >
        {children}
      </a>
    );
  }

  // Generated text routes are not in the typed-route graph; render as a same-tab anchor.
  if (/\.(txt|xml)$/.test(href)) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href as Route} className={className} {...rest}>
      {children}
    </Link>
  );
}
