import type { ReactNode } from "react";

/**
 * Uppercase tracked terra-cotta eyebrow — the template's `Subtitle` /
 * `Big Subtitle` styles. The only routine carrier of the accent color.
 */
export function Eyebrow({
  children,
  size = "sm",
  as: Tag = "p",
  id
}: {
  children: ReactNode;
  size?: "sm" | "lg";
  as?: "p" | "span";
  id?: string;
}) {
  return (
    <Tag id={id} className={size === "lg" ? "eyebrow eyebrow--lg" : "eyebrow"}>
      {children}
    </Tag>
  );
}
