import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  size?: "default" | "wide" | "narrow";
};

/** Width primitive bound to the `--container` token (Synk's 1200px max). */
export function Container({ children, as: Tag = "div", className, size = "default" }: ContainerProps) {
  return (
    <Tag className={["container", `container-${size}`, className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
