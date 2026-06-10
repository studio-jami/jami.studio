import Link from "next/link";
import type { Route } from "next";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Trailing affordance glyph (arrow). Off for icon-only / link variants. */
  withArrow?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

type ButtonAsInternalLink = CommonProps & { href: string; external?: false };

type ButtonAsExternalLink = CommonProps &
  Omit<ComponentProps<"a">, "className" | "children" | "href"> & {
    href: string;
    external: true;
  };

type ButtonProps = ButtonAsButton | ButtonAsInternalLink | ButtonAsExternalLink;

function classesFor(variant: Variant, size: Size, className?: string) {
  return ["btn", `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(" ");
}

function Inner({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      <span className="btn-label">{children}</span>
      {withArrow ? (
        <svg
          className="btn-arrow"
          viewBox="0 0 16 16"
          width="14"
          height="14"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M3 8h9M8.5 4l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </>
  );
}

/**
 * One button shape, one radius, one motion. Renders a <button>, an internal
 * <Link>, or an external <a> based on props — so every call site stays uniform.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, withArrow } = props;
  const classes = classesFor(variant, size, className);

  if (props.href === undefined) {
    const { variant: _v, size: _s, className: _c, withArrow: _a, children: _ch, ...rest } = props;
    void _v;
    void _s;
    void _c;
    void _a;
    void _ch;
    return (
      <button className={classes} {...rest}>
        <Inner withArrow={withArrow}>{children}</Inner>
      </button>
    );
  }

  if ("external" in props && props.external) {
    const {
      variant: _v,
      size: _s,
      className: _c,
      withArrow: _a,
      children: _ch,
      href,
      external: _e,
      ...rest
    } = props;
    void _v;
    void _s;
    void _c;
    void _a;
    void _ch;
    void _e;
    return (
      <a className={classes} href={href} rel="noreferrer noopener" target="_blank" {...rest}>
        <Inner withArrow={withArrow}>{children}</Inner>
      </a>
    );
  }

  return (
    <Link className={classes} href={props.href as Route}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </Link>
  );
}
