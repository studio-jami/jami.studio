import type { ReactNode } from "react";
import type { ProjectSlug } from "@/content/projects";

type IconProps = {
  className?: string;
};

const iconPaths: Record<ProjectSlug, ReactNode> = {
  harness: (
    <>
      <rect x="4" y="8" width="32" height="24" rx="4" fill="currentColor" opacity="0.12" />
      <path
        d="M12 20h8M12 24h12M28 20v8M20 16v12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="28" cy="16" r="4" fill="currentColor" />
      <path
        d="M26 16l2 2 4-4"
        stroke="var(--accent-foreground, #fff)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  registry: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="3" fill="currentColor" opacity="0.15" />
      <rect x="22" y="6" width="12" height="12" rx="3" fill="currentColor" opacity="0.25" />
      <rect x="6" y="22" width="12" height="12" rx="3" fill="currentColor" opacity="0.25" />
      <rect x="22" y="22" width="12" height="12" rx="3" fill="currentColor" />
      <path
        d="M18 12h4M12 18v4M24 18v4M18 24h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </>
  ),
  orchestra: (
    <>
      <circle cx="20" cy="12" r="6" fill="currentColor" opacity="0.2" />
      <circle cx="10" cy="28" r="5" fill="currentColor" opacity="0.35" />
      <circle cx="30" cy="28" r="5" fill="currentColor" />
      <path
        d="M17 16l-5 9M23 16l5 9M15 28h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </>
  ),
  intercal: (
    <>
      <path
        d="M8 28V12l12-6 12 6v16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="currentColor"
        opacity="0.1"
      />
      <path d="M8 20h24M14 24h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="14" r="3" fill="currentColor" />
      <path
        d="M26 10l4 2-4 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  collectiva: (
    <>
      <circle cx="20" cy="14" r="5" fill="currentColor" />
      <circle cx="10" cy="26" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="30" cy="26" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="20" cy="30" r="3" fill="currentColor" opacity="0.35" />
      <path
        d="M17 17l-5 7M23 17l5 7M20 19v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
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