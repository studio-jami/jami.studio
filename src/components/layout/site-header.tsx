import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "../theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="jami.studio home">
        <img src="/brand/logo-gold-bg.png" alt="jami.studio" className="brand-mark" aria-hidden="true" />
        <span className="brand-wordmark">{site.name}</span>
      </Link>
      <nav aria-label="Primary navigation">
        {site.nav.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link">
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
