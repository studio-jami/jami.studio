import type { ReactNode } from "react";

/** Mono uppercase label with a leading hairline tick. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={className ? `eyebrow ${className}` : "eyebrow"}>{children}</p>;
}

/** Small mono chip for hosts, disciplines, and capability teases. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={className ? `tag ${className}` : "tag"}>{children}</span>;
}
