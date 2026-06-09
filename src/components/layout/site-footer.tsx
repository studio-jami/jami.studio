import Link from "next/link";
import { BrandMark } from "@/components/system/brand-mark";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div>
          <Link href="/" aria-label="jami.studio home">
            <BrandMark size="sm" />
          </Link>
          <p className="description">{site.description}</p>
        </div>

        <nav aria-label="Footer navigation">
          {site.footerLinks.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <p className="footer-note">
          Canonical public surface for developers, agents, and the Studio project family. All routes, metadata, and AI files are generated from shared source data.
        </p>
      </div>
    </footer>
  );
}
