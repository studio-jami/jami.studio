import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { HeaderShell } from "./header-shell";
import { ThemeToggle } from "../theme-toggle";

export function SiteHeader() {
  return (
    <HeaderShell>
      <Link href="/" className="brand" aria-label="jami.studio home">
        <Image
          src="/brand/mark-gold.png"
          alt=""
          width={64}
          height={64}
          className="brand-mark"
          priority
        />
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
    </HeaderShell>
  );
}
