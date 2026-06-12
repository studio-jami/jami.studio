import type { ReactNode } from "react";

/**
 * Editorial inner column — the template's `Inner` frame: centered, max-width
 * from `--container`, gutters handled by section padding.
 */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={["container", className].filter(Boolean).join(" ")}>{children}</div>;
}
