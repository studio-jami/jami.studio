import Link from "next/link";
import type { Route } from "next";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";
import { GitHubIcon, LinkedInIcon, SparkIcon, TikTokIcon, XIcon } from "@/components/ui/icons";

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

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <GitHubIcon size={16} />,
  LinkedIn: <LinkedInIcon size={16} />,
  X: <XIcon size={16} />,
  TikTok: <TikTokIcon size={16} />
};

/**
 * SiteFooter — the template's two-part footer: brand + tagline + social icon
 * row at left, link columns at right, and a hairline base row. All link data
 * comes from the content layer (`site.footerLinks`, `site.social`,
 * `site.email`, AI index routes).
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-lede">
          <Link href="/" className="brand" aria-label={`${site.name} home`}>
            <span className="brand-mark" aria-hidden="true">
              <SparkIcon size={18} />
            </span>
            <span className="brand-word">{site.name}</span>
          </Link>
          <p>{site.description}</p>
          <div className="footer-social" aria-label="Studio social links">
            {site.social.map((item) => (
              <a
                key={item.href}
                className="footer-social-link"
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={item.label}
                title={item.label}
              >
                {socialIcons[item.label] ?? item.label}
              </a>
            ))}
          </div>
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

          <nav className="footer-col" aria-label="Navigation">
            <p className="footer-col-title">Navigation</p>
            <Link href="/projects">All projects</Link>
            <FooterLink href="/llms.txt" label="AI index" />
            <FooterLink href="/llms-full.txt" label="AI source bundle" />
            <FooterLink href={studioLinks.githubOrg} label="GitHub" />
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
