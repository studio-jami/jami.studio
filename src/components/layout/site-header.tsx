import Link from "next/link";
import { BrandMark } from "@/components/system/brand-mark";
import { ThemeToggle } from "@/components/system/theme-toggle";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" aria-label="jami.studio home">
          <BrandMark size="md" />
        </Link>

        <nav aria-label="Primary navigation">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
