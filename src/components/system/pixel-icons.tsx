/**
 * Synk's pixel-art ornament vocabulary, authored as inline SVG on an 11×11
 * grid (fill = currentColor, so every glyph is token-tinted). No external
 * assets — these are drawn here, not downloaded.
 */

type IconProps = {
  className?: string;
};

function px(cells: [number, number][]) {
  return (
    <>
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} />
      ))}
    </>
  );
}

/** Classic 8-bit heart (quote selector cards). */
export function PixelHeart({ className }: IconProps) {
  const cells: [number, number][] = [];
  const rows = [
    "..XX...XX..",
    ".XXXX.XXXX.",
    "XXXXXXXXXXX",
    "XXXXXXXXXXX",
    "XXXXXXXXXXX",
    ".XXXXXXXXX.",
    "..XXXXXXX..",
    "...XXXXX...",
    "....XXX....",
    ".....X....."
  ];
  rows.forEach((row, y) => {
    row.split("").forEach((cell, x) => {
      if (cell === "X") cells.push([x, y]);
    });
  });
  return (
    <svg viewBox="0 0 11 10" fill="currentColor" aria-hidden="true" className={className}>
      {px(cells)}
    </svg>
  );
}

/** Stair-step corner ornament (quote panel corners). */
export function PixelStair({ className }: IconProps) {
  const cells: [number, number][] = [];
  // descending staircase from top-left
  for (let step = 0; step < 5; step += 1) {
    for (let y = 0; y <= step; y += 1) {
      cells.push([step, y]);
    }
  }
  return (
    <svg viewBox="0 0 5 5" fill="currentColor" aria-hidden="true" className={className}>
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} />
      ))}
    </svg>
  );
}

/** Pixel ► play-arrow (expect-grid icon columns). */
export function PixelArrow({ className }: IconProps) {
  const rows = ["X....", "XX...", "XXX..", "XXXX.", "XXXXX", "XXXX.", "XXX..", "XX...", "X...."];
  const cells: [number, number][] = [];
  rows.forEach((row, y) => {
    row.split("").forEach((cell, x) => {
      if (cell === "X") cells.push([x, y]);
    });
  });
  return (
    <svg viewBox="0 0 5 9" fill="currentColor" aria-hidden="true" className={className}>
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} />
      ))}
    </svg>
  );
}

/** Dotted padlock dot-art (privacy/governance mockup). */
export function DottedLock({ className }: IconProps) {
  const dots: { x: number; y: number; o: number }[] = [];
  // shackle: arc of dots
  for (let i = 0; i <= 14; i += 1) {
    const t = Math.PI * (i / 14);
    dots.push({ x: 50 - Math.cos(t) * 22, y: 38 - Math.sin(t) * 26, o: 0.9 });
  }
  // body: rounded block of dots
  for (let row = 0; row < 7; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const x = 26 + col * 6;
      const y = 44 + row * 6;
      // keyhole void
      const inKeyhole =
        (Math.abs(x - 50) < 4 && y > 54 && y < 74) || Math.hypot(x - 50, y - 56) < 5;
      if (!inKeyhole) dots.push({ x, y, o: 0.65 });
    }
  }
  return (
    <svg viewBox="0 0 100 92" fill="currentColor" aria-hidden="true" className={className}>
      {dots.map((dot, index) => (
        <circle key={index} cx={dot.x} cy={dot.y} r={1.7} opacity={dot.o} />
      ))}
    </svg>
  );
}

/** Quiet geometric glyphs for the five products + shared source (no logos). */
export function FamilyGlyph({ kind, className }: IconProps & { kind: string }) {
  switch (kind) {
    case "harness": // governed loop: square ring with gate notch
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
          <path d="M7 3h-4v14h14v-14h-4" />
          <path d="M10 1v8" />
          <circle cx="10" cy="12" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "registry": // tokenized grid
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
          <rect x="2.5" y="2.5" width="6" height="6" />
          <rect x="11.5" y="2.5" width="6" height="6" strokeDasharray="2 2" />
          <rect x="2.5" y="11.5" width="6" height="6" strokeDasharray="2 2" />
          <rect x="11.5" y="11.5" width="6" height="6" />
        </svg>
      );
    case "orchestra": // coordinated bars
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
          <path d="M3 15v-6M8 15V5M13 15v-8M18 15v-4" strokeLinecap="square" />
          <path d="M2 18h17" />
        </svg>
      );
    case "intercal": // temporal delta
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
          <circle cx="10" cy="10" r="7.5" strokeDasharray="3 2.5" />
          <path d="M10 5.5V10l3.5 2" />
        </svg>
      );
    case "collectiva": // society nodes
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
          <circle cx="10" cy="4" r="2" />
          <circle cx="4" cy="15" r="2" />
          <circle cx="16" cy="15" r="2" />
          <path d="M8.6 5.8 5 13.2M11.4 5.8 15 13.2M6 15h8" />
        </svg>
      );
    default: // shared source: document with seam
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
          <path d="M5 2.5h7l3 3v12H5z" />
          <path d="M12 2.5v3h3" />
          <path d="M7.5 10h5M7.5 13h5" strokeDasharray="2 1.5" />
        </svg>
      );
  }
}

/** Tiny utility glyphs used inside the micro-UI mockups. */
export function GlyphSearch({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 3.5 3.5" />
    </svg>
  );
}

export function GlyphSparkle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 1.5 9.6 6 14 7.5 9.6 9 8 13.5 6.4 9 2 7.5 6.4 6Z" />
      <path d="M13 11.4 13.7 13l1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7Z" opacity="0.7" />
    </svg>
  );
}

export function GlyphDoc({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className={className}>
      <rect x="3" y="2" width="10" height="12" rx="1.5" />
      <path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3" />
    </svg>
  );
}

export function GlyphCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <path d="m3 8.5 3.2 3.2L13 4.8" />
    </svg>
  );
}
