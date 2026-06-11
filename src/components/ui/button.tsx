import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  "aria-label"?: string;
};

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * One button shape, one radius scale, one motion — variants are props, never one-offs.
 * Internal hrefs (from the route layer) render a typed `next/link`; everything else (repo,
 * subdomain, docs, mailto) renders a plain anchor with safe rel. Hrefs are always passed
 * in from the content/route layer — this component never builds a URL.
 */
export function Button({ href, children, variant = "primary", className, ...rest }: ButtonProps) {
  const cls = ["button", `button-${variant}`, className].filter(Boolean).join(" ");

  if (isInternal(href)) {
    return (
      <Link href={href as Route} className={cls} {...rest}>
        <span className="button-label">{children}</span>
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...rest}
    >
      <span className="button-label">{children}</span>
    </a>
  );
}
