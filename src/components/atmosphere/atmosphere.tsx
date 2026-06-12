type AtmosphereProps = {
  /** Placement variant tunes the glow position/intensity per section. */
  variant?: "hero" | "section" | "cta";
};

/**
 * Low-contrast radial-gradient glow layer that gives the dark canvas depth behind
 * heroes and feature bands. Two soft wine-rose/warm radials at most; the grain
 * overlay sits above to dissolve any 8-bit banding. Purely decorative.
 */
export function Atmosphere({ variant = "section" }: AtmosphereProps) {
  return <div className={`atmosphere atmosphere-${variant}`} aria-hidden="true" />;
}
