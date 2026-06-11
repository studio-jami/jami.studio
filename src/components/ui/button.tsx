import type { ReactNode } from "react";
import { AppLink } from "./app-link";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "md" | "lg";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  "aria-label"?: string;
};

/**
 * One button shape, one radius scale, one motion vocabulary across the site.
 * Hrefs come from the content/route layer; this component never builds a URL.
 * Variants are props, never one-off styles. Link-vs-anchor is delegated to AppLink.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonProps) {
  const classes = ["button", `button-${variant}`, `button-${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <AppLink href={href} className={classes} {...rest}>
      {children}
    </AppLink>
  );
}
