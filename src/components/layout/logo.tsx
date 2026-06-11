import Link from "next/link";
import { site } from "@/content/site";

/**
 * Wordmark + frame mark. The mark is a token-driven bracket frame (matches the lane's
 * `logos.markShape: "frame"`); no raster asset, fully theme-aware.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={["logo", className].filter(Boolean).join(" ")}
      aria-label={`${site.name} home`}
    >
      <span className="logo-mark" aria-hidden="true">
        <span className="logo-mark-dot" />
      </span>
      <span className="logo-word">{site.name}</span>
    </Link>
  );
}
