import type { ReactNode } from "react";

type ShellProps = {
  children: ReactNode;
  className?: string;
};

/** Width-constrained content shell bound to the `--container` token. */
export function Shell({ children, className }: ShellProps) {
  return <div className={className ? `shell ${className}` : "shell"}>{children}</div>;
}

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** `band` renders a full-bleed surfaced strip with hairline rules. */
  tone?: "default" | "band";
  className?: string;
  ariaLabel?: string;
};

/** Vertical-rhythm primitive bound to the `--section` token. */
export function Section({ children, id, tone = "default", className, ariaLabel }: SectionProps) {
  const classes = ["section"];
  if (tone === "band") classes.push("section--band");
  if (className) classes.push(className);

  return (
    <section id={id} className={classes.join(" ")} aria-label={ariaLabel}>
      <Shell>{children}</Shell>
    </section>
  );
}
