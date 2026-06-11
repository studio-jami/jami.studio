import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import styles from "./button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
};

type ButtonProps = BaseProps & {
  href: string;
  /** External links (http/mailto) render as <a>; internal paths use next/link. */
  external?: boolean;
  ariaLabel?: string;
};

function isExternal(href: string, explicit?: boolean): boolean {
  if (explicit !== undefined) return explicit;
  return /^(https?:|mailto:|tel:)/.test(href);
}

function classes(variant: Variant, size: Size, withArrow: boolean, className?: string) {
  return [styles.button, styles[variant], styles[size], withArrow ? styles.hasArrow : "", className]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  external,
  withArrow = false,
  className,
  ariaLabel
}: ButtonProps) {
  const cls = classes(variant, size, withArrow, className);
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {withArrow ? (
        <span className={styles.arrow} aria-hidden="true">
          ↗
        </span>
      ) : null}
    </>
  );

  if (isExternal(href, external)) {
    return (
      <a
        className={cls}
        href={href}
        aria-label={ariaLabel}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={cls} href={href as Route} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
