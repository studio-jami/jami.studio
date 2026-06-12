import type { ReactNode } from "react";

/**
 * Small mono label / pill. `dot` adds the accent status dot (Synk "Simple-tag").
 */
export function Badge({ children, dot }: { children: ReactNode; dot?: boolean }) {
  return (
    <span className="badge">
      {dot ? <span className="badge-dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

/** Quiet mono tag used inside cards for capability/discipline labels. */
export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}
