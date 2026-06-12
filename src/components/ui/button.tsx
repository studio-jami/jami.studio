import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
};

function classes(variant: Variant, className?: string) {
  return ["btn", `btn-${variant}`, className].filter(Boolean).join(" ");
}

function isInternal(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  // Generated text/feed routes are not page routes — load them as plain links.
  return !/\.(txt|xml)$/.test(href);
}

/**
 * Button styled link. Internal routes use next/link; external/protocol links
 * (mailto:, https://, /llms.txt, /robots.txt) render a plain anchor. Hrefs are
 * always supplied by the content/route layer — never hand-assembled here.
 */
export function ButtonLink({
  href,
  external,
  variant = "primary",
  className,
  children
}: LinkButtonProps) {
  if (isInternal(href) && !external) {
    return (
      <Link href={href as Route} className={classes(variant, className)}>
        {children}
      </Link>
    );
  }

  const isHttp = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes(variant, className)}
      {...(isHttp ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {children}
    </a>
  );
}
