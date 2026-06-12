import Link from "next/link";
import type { Route } from "next";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type SmartLinkProps = {
  href: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/**
 * Route-aware anchor: internal app routes go through `next/link` (typedRoutes
 * cast), generated text endpoints (`.txt`/`.xml`) render as plain anchors, and
 * off-site/mailto links open safely. Hrefs always come from the content layer.
 */
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  const isInternalRoute = href.startsWith("/") && !/\.(txt|xml)$/.test(href);

  if (isInternalRoute) {
    return (
      <Link href={href as Route} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
