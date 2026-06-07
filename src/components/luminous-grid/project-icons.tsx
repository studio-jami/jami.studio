import type { ReactNode } from "react";
import type { ProjectSlug } from "@/content/projects";

type IconProps = {
  className?: string;
};

const iconPaths: Record<ProjectSlug, ReactNode> = {
  harness: (
    <>
      <rect x="5" y="9" width="30" height="22" rx="5" fill="currentColor" opacity="0.1" />
      <rect x="9" y="13" width="22" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M13 20h6M13 24h10M26 20v6M20 17v9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="28" cy="15" r="4.5" fill="currentColor" />
      <path
        d="M26.5 15l1.5 1.5 3-3"
        stroke="var(--accent-foreground, #fff)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  registry: (
    <>
      <rect x="5" y="5" width="13" height="13" rx="3.5" fill="currentColor" opacity="0.14" />
      <rect x="22" y="5" width="13" height="13" rx="3.5" fill="currentColor" opacity="0.28" />
      <rect x="5" y="22" width="13" height="13" rx="3.5" fill="currentColor" opacity="0.28" />
      <rect x="22" y="22" width="13" height="13" rx="3.5" fill="currentColor" />
      <path
        d="M18 11.5h4M11.5 18v4M24.5 18v4M18 24.5h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />
    </>
  ),
  orchestra: (
    <>
      <circle cx="20" cy="11" r="6.5" fill="currentColor" opacity="0.18" />
      <circle cx="9.5" cy="28" r="5.5" fill="currentColor" opacity="0.32" />
      <circle cx="30.5" cy="28" r="5.5" fill="currentColor" />
      <path
        d="M16.5 15.5l-4.5 10M23.5 15.5l4.5 10M14 28h12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="20" cy="11" r="2" fill="currentColor" opacity="0.5" />
    </>
  ),
  intercal: (
    <>
      <path
        d="M7 29V13l13-7 13 7v16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="currentColor"
        opacity="0.08"
      />
      <path d="M7 21h26M13 25h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="14" r="3.5" fill="currentColor" />
      <path
        d="M25.5 10.5l5 2.5-5 2.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  collectiva: (
    <>
      <circle cx="20" cy="13" r="5.5" fill="currentColor" />
      <circle cx="9.5" cy="27" r="4.5" fill="currentColor" opacity="0.48" />
      <circle cx="30.5" cy="27" r="4.5" fill="currentColor" opacity="0.48" />
      <circle cx="20" cy="31" r="3.5" fill="currentColor" opacity="0.32" />
      <path
        d="M16.5 16l-5.5 8M23.5 16l5.5 8M20 18.5v9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
    </>
  )
};

export function ProjectIcon({ slug, className }: { slug: ProjectSlug } & IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {iconPaths[slug]}
    </svg>
  );
}