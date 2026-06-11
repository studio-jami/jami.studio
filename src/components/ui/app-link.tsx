import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type LinkHref = ComponentProps<typeof Link>["href"];

/**
 * One link primitive for content-layer hrefs. A href is a plain document/external
 * anchor when it is absolute (http/mailto/tel) or points at a generated file or
 * non-page handler route (anything ending in a file extension, e.g. /sitemap.xml,
 * /robots.txt, /llms.txt). Real in-app page routes ("/", "/projects",
 * "/projects/[slug]") use next/link. The content layer owns every href; this
 * component only decides how to render it.
 */
export function isDocumentLink(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href) || /\.[a-z0-9]+$/i.test(href);
}

type AppLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  onClick?: () => void;
};

export function AppLink({ href, children, className, onClick, ...rest }: AppLinkProps) {
  if (isDocumentLink(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href as LinkHref} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
