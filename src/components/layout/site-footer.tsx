import Link from "next/link";
import type { Route } from "next";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";

function isExternal(href: string) {
  return /^https?:/.test(href);
}

function FooterLink({ href, label }: { href: string; label: string }) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {label}
      </a>
    );
  }
  return <Link href={href as Route}>{label}</Link>;
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-lede">
          <Link href="/" className="brand" aria-label={`${site.name} home`}>
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark-core" />
            </span>
            <span className="brand-word">{site.name}</span>
          </Link>
          <p>{site.description}</p>
          <a className="footer-email" href={studioLinks.emailHref}>
            {site.email}
          </a>
        </div>

        <div className="site-footer-cols">
          <nav className="footer-col" aria-label="Projects">
            <p className="footer-col-title">Projects</p>
            {site.footerLinks.map((item) => (
              <FooterLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <nav className="footer-col" aria-label="Resources">
            <p className="footer-col-title">Resources</p>
            <Link href="/projects">All projects</Link>
            <FooterLink href="/llms.txt" label="AI index" />
            <FooterLink href="/llms-full.txt" label="AI source bundle" />
          </nav>

          <nav className="footer-col" aria-label="Studio">
            <p className="footer-col-title">Studio</p>
            {site.social.map((item) => (
              <FooterLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </div>
      </div>

      <div className="site-footer-base">
        <p>
          © {year} {site.legalName}. Open-core foundations for agent-native products.
        </p>
        <p className="site-footer-meta">
          Built static-first · {site.handles.npm} · {site.handles.x}
        </p>
      </div>
    </footer>
  );
}
