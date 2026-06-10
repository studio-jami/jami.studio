import Link from "next/link";
import { site } from "@/content/site";
import { brand } from "@/tokens/theme";

/**
 * Shared brand lockup: the official illustrated jami.studio portrait, framed
 * as a circular avatar badge, beside the lowercase "jami.studio" wordmark.
 * Used in the header and footer so the mark is identical everywhere.
 *
 * The avatar asset (`brand.avatar`) is a square face crop generated from the
 * official portrait lockup (`brand.portrait`), which carries its own baked-in
 * wordmark — we typeset the wordmark ourselves so it stays a token-driven,
 * selectable part of the page.
 */
export function BrandMark({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <Link
      href="/"
      className={`brand${size === "lg" ? " brand--lg" : ""}`}
      aria-label={`${site.name} — home`}
    >
      <span className="brand__mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="brand__avatar"
          src={brand.avatar}
          alt=""
          width={64}
          height={64}
          loading="eager"
          decoding="async"
          aria-hidden="true"
        />
      </span>
      <span className="brand__word">
        jami<span className="brand__dot">.</span>studio
      </span>
    </Link>
  );
}
