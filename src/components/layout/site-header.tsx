import Link from "next/link";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="jami.studio home">
        <span className="brand-mark" aria-hidden="true" />
        <span>{site.name}</span>
      </Link>
      <nav aria-label="Primary navigation">
        {site.nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
