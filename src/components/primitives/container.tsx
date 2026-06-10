import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  width?: "default" | "wide" | "narrow";
  className?: string;
  children: ReactNode;
};

export function Container({
  as: Tag = "div",
  width = "default",
  className,
  children
}: ContainerProps) {
  return (
    <Tag className={`container container--${width}${className ? ` ${className}` : ""}`}>
      {children}
    </Tag>
  );
}
