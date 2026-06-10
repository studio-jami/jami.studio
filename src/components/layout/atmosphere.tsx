type AtmosphereProps = {
  /**
   * `hero` — large twin glows for page openers.
   * `band` — a single quiet wash for full-bleed strips.
   */
  variant?: "hero" | "band";
};

/**
 * Layered radial-glow atmosphere. Sits behind section content; the global
 * grain overlay dissolves its gradient steps into film tooth. Purely
 * decorative and static — safe under prefers-reduced-motion.
 */
export function Atmosphere({ variant = "hero" }: AtmosphereProps) {
  return (
    <div className={`atmosphere atmosphere--${variant}`} aria-hidden="true">
      <span className="atmosphere-glow atmosphere-glow--a" />
      {variant === "hero" ? <span className="atmosphere-glow atmosphere-glow--b" /> : null}
    </div>
  );
}
