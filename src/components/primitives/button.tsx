import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  trailingIcon?: boolean;
};

type InternalLinkProps = CommonProps & {
  /** A typed, in-app route (`/`, `/projects`, `/projects/[slug]`). */
  to: Route;
};

type ExternalLinkProps = CommonProps & {
  /** Any non-typed href: external URL, file route (/llms.txt), anchor. */
  href: string;
  external?: boolean;
};

type ButtonProps = CommonProps & {
  type?: "button" | "submit";
  onClick?: () => void;
};

function classes(variant: Variant, size: Size, trailingIcon: boolean, extra?: string) {
  return `btn btn--${variant} btn--${size}${trailingIcon ? " btn--icon" : ""}${
    extra ? ` ${extra}` : ""
  }`;
}

function Arrow() {
  return (
    <svg className="btn__arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M3 8h9M8.5 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Internal app navigation via next/link with typed routes. */
export function ButtonLink({
  to,
  variant = "primary",
  size = "md",
  trailingIcon = false,
  className,
  children
}: InternalLinkProps) {
  return (
    <Link href={to} className={classes(variant, size, trailingIcon, className)}>
      <span className="btn__label">{children}</span>
      {trailingIcon ? <Arrow /> : null}
    </Link>
  );
}

/** External / non-page links (repos, subdomains, /llms.txt, anchors). */
export function ButtonAnchor({
  href,
  external,
  variant = "secondary",
  size = "md",
  trailingIcon = false,
  className,
  children
}: ExternalLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={classes(variant, size, trailingIcon, className)}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      <span className="btn__label">{children}</span>
      {trailingIcon ? <Arrow /> : null}
    </a>
  );
}

/** A real <button> for client actions. */
export function Button({
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  trailingIcon = false,
  className,
  children
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={classes(variant, size, trailingIcon, className)}>
      <span className="btn__label">{children}</span>
      {trailingIcon ? <Arrow /> : null}
    </button>
  );
}
