import type { ReactNode } from "react";

type IconProps = {
  size?: number;
  className?: string;
};

function Svg({ children, size = 22, className }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ---------- pillar / benefit glyphs ------------------------------------- */

/** Governed runtime — a shielded loop. */
export function RuntimeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9.5 12l1.8 1.8 3.4-3.6" />
    </Svg>
  );
}

/** Trusted interfaces — a layered/registry vocabulary. */
export function InterfaceIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M3 8h18M7 12h6M7 14.5h4" />
    </Svg>
  );
}

/** Durable coordination — connected nodes. */
export function CoordinationIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M8 7.4l4 8.2M16 7.4l-4 8.2M8.4 6h7.2" />
    </Svg>
  );
}

/** Agent-readable knowledge — temporal/provenance. */
export function KnowledgeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </Svg>
  );
}

/** Provider choice / BYOK — a key. */
export function KeyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="14.5" r="4" />
      <path d="M11 11.5L20 3M16 7l3 3M13.5 9.5l2 2" />
    </Svg>
  );
}

/** Clear boundaries — a partitioned frame. */
export function BoundaryIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M12 3.5v17M3.5 12h17" />
    </Svg>
  );
}

/** Durable records — a layered archive. */
export function ArchiveIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
      <path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5" />
    </Svg>
  );
}

/* ---------- small UI glyphs (chips, mocks, controls) --------------------- */

/** Four-point sparkle — the template's brand glyph. */
export function SparkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3c.6 3.9 2.6 6.4 7 7-4.4.6-6.4 3.1-7 7-.6-3.9-2.6-6.4-7-7 4.4-.6 6.4-3.1 7-7z" />
      <path d="M18.5 14.5c.3 1.6 1.1 2.7 3 3-1.9.3-2.7 1.4-3 3-.3-1.6-1.1-2.7-3-3 1.9-.3 2.7-1.4 3-3z" />
    </Svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3 9 9 0 0 1-3.2-.6L4 20.5l1.4-4A8 8 0 0 1 4 11.5 8.4 8.4 0 0 1 12.5 3.2 8.4 8.4 0 0 1 21 11.5z" />
    </Svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.2l2.4 2.4 4.6-5" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12.5l4.2 4.2L19 7" />
    </Svg>
  );
}

export function SendIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z" />
    </Svg>
  );
}

export function PaperclipIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 11.5l-7.8 7.8a5 5 0 0 1-7-7L13 4.5a3.3 3.3 0 0 1 4.7 4.7L10 17a1.7 1.7 0 0 1-2.4-2.4l7-7" />
    </Svg>
  );
}

export function MicIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
    </Svg>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M3.5 17l5-5 4 4 3-3 5 5" />
    </Svg>
  );
}

export function LibraryIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 4.5h4v15h-4zM10.5 4.5h4v15h-4zM16 5.5l4 1-3 13-4-1" />
    </Svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M15 6l-6 6 6 6" />
    </Svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 6l6 6-6 6" />
    </Svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

/* ---------- social glyphs (filled) --------------------------------------- */

function SocialSvg({ children, size = 18, className }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </SocialSvg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path d="M17.7 3H20.6l-6.34 7.25L21.7 21h-5.84l-4.57-5.98L6.06 21H3.15l6.78-7.76L2.7 3h5.99l4.13 5.47L17.7 3zm-1.02 16.27h1.61L7.82 4.65H6.09l10.59 14.62z" />
    </SocialSvg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path d="M4.98 3.5A2.49 2.49 0 0 1 2.5 6a2.49 2.49 0 0 1 0-4.98 2.49 2.49 0 0 1 2.48 2.48zM.28 8.25h4.45V21.5H.28V8.25zM8.1 8.25h4.27v1.81h.06c.6-1.13 2.05-2.32 4.22-2.32 4.51 0 5.35 2.97 5.35 6.83v6.93h-4.45v-6.14c0-1.47-.03-3.35-2.04-3.35-2.05 0-2.36 1.6-2.36 3.24v6.25H8.1V8.25z" transform="translate(1.5 0)" />
    </SocialSvg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path d="M16.7 2h-3.1v13.6a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .87.1V9.62a6.06 6.06 0 0 0-.87-.06 6.04 6.04 0 1 0 6.04 6.04V8.73A7.5 7.5 0 0 0 21 10.1V7a4.5 4.5 0 0 1-4.3-5z" />
    </SocialSvg>
  );
}
