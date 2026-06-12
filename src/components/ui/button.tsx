import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "md" | "lg";

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

function isStaticRoute(href: string): boolean {
  // Generated text endpoints (llms.txt, robots.txt, sitemap.xml) are real files,
  // not typed app routes — render them as plain anchors so typedRoutes stays happy.
  return /\.(txt|xml)$/.test(href);
}

/**
 * One button shape, one radius scale, one motion vocabulary. Internal app routes
 * render through `next/link`; generated text files and external links render as
 * anchors (new tab for off-site). Hrefs always come from the content/route layer.
 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = ["btn", `btn-${variant}`, `btn-${size}`, className].filter(Boolean).join(" ");
  const content = (
    <>
      <span className="btn-label">{children}</span>
      {variant !== "link" ? (
        <span className="btn-arrow" aria-hidden="true">
          →
        </span>
      ) : null}
    </>
  );

  if (isInternal(href) && !isStaticRoute(href)) {
    return (
      <Link href={href as Route} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const external = !isInternal(href);

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
