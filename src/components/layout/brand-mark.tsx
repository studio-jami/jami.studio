import Image from "next/image";
import avatarDark from "../../../public/brand/jami-avatar-red.png";
import avatarLight from "../../../public/brand/jami-avatar-pink.png";

/**
 * The Studio brand mark: the official jami.studio character portrait presented
 * as a tasteful circular avatar. The portrait is theme-aware over the same
 * `[data-theme]` switch as the rest of the system — the violet-haired variant
 * carries the nocturnal dark canvas, the teal-haired variant carries the warm
 * light theme — and a hairline ring + glow seat it on either surface. Both
 * images render in the DOM; CSS reveals the one matching the active theme so the
 * swap is instant and flash-free.
 */
export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <span className="brand-mark" style={{ width: size, height: size }} aria-hidden="true">
      <Image
        className="brand-avatar brand-avatar--dark"
        src={avatarDark}
        alt=""
        width={size}
        height={size}
        sizes={`${size}px`}
        priority
      />
      <Image
        className="brand-avatar brand-avatar--light"
        src={avatarLight}
        alt=""
        width={size}
        height={size}
        sizes={`${size}px`}
        priority
      />
    </span>
  );
}
