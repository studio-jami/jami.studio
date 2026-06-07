import Link from "next/link";
import { site } from "@/content/site";

export function SignalForgeHeader() {
  return (
    <header className="forge-header">
      <div className="forge-header-inner">
        <Link href="/" className="brand forge-brand" aria-label="jami.studio home">
          <span className="brand-mark forge-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 20 20" width="20" height="20" role="presentation">
              <defs>
                <linearGradient id="brand-gradient" x1="0" y1="0" x2="20" y2="20">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="16" height="16" rx="4" fill="none" stroke="url(#brand-gradient)" />
              <path
                d="M4 14 L8 8 L11 11 L16 5"
                fill="none"
                stroke="url(#brand-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span>{site.name}</span>
        </Link>
        <nav aria-label="Primary navigation">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}