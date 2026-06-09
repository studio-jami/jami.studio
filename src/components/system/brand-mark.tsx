import Image from "next/image";
import { site } from "@/content/site";

type BrandMarkProps = {
  size?: "sm" | "md";
  showWordmark?: boolean;
  className?: string;
};

/**
 * Canonical brand lockup using the official illustrated character portrait.
 * The source files have solid backgrounds — we present as a circular avatar crop
 * isolating the face/hair, never a raw colored rectangle on arbitrary surfaces.
 */
export function BrandMark({ size = "md", showWordmark = true, className }: BrandMarkProps) {
  const markSize = size === "sm" ? 22 : 28;
  const src = "/brand/logo-white.jpg"; // cleanest for circular crop on dark; light theme adapts via CSS

  return (
    <span className={`brand ${className ?? ""}`} aria-label={site.name}>
      <span
        className="brand-mark"
        style={{ width: markSize, height: markSize }}
        aria-hidden="true"
      >
        <Image
          src={src}
          alt=""
          width={markSize}
          height={markSize}
          style={{ objectPosition: "50% 38%" }}
          priority={size === "md"}
        />
      </span>
      {showWordmark && <span className="brand-wordmark">{site.name}</span>}
    </span>
  );
}
