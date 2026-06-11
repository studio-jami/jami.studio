import type { ReactNode } from "react";
import { SmartLink } from "./smart-link";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  withArrow?: boolean;
  block?: boolean;
  className?: string;
  "aria-label"?: string;
};

const arrow = (
  <svg
    className="button-arrow"
    viewBox="0 0 16 16"
    width="15"
    height="15"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden="true"
  >
    <path d="M3 8h9M8.5 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * The single button shape for the site (pill, one radius, one motion vocabulary).
 * Renders as a link because every CTA targets a route resolved by the content layer.
 */
export function Button({
  href,
  children,
  variant = "primary",
  withArrow = false,
  block = false,
  className,
  ...rest
}: ButtonProps) {
  const classes = [
    "button",
    `button--${variant}`,
    block ? "button--block" : "",
    className ?? ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <SmartLink href={href} className={classes} {...rest}>
      {children}
      {withArrow ? arrow : null}
    </SmartLink>
  );
}

/** Inline arrow text link sharing the button's accent + motion language. */
export function TextLink({
  href,
  children,
  className
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <SmartLink href={href} className={["text-link", className ?? ""].filter(Boolean).join(" ")}>
      {children}
      {arrow}
    </SmartLink>
  );
}
