import Image from "next/image";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand">
              <Image src="/brand/mark-gold.png" alt="" width={64} height={64} className="brand-mark" />
              <strong>{site.name}</strong>
            </span>
            <p>{site.description}</p>
          </div>
          <nav aria-label="Footer navigation" className="footer-nav">
            {site.footerLinks.map((item) => (
              <a key={item.href} href={item.href} className="footer-link">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>Canonical public surface for developers, agents, and the Studio project family.</span>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
