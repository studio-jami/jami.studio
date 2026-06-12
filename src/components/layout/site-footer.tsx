import Link from "next/link";
import type { Route } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";

function isInternalPage(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  return !/\.(txt|xml)$/.test(href);
}

function FooterLink({ href, children }: { href: string; children: string }) {
  if (isInternalPage(href)) {
    return <Link href={href as Route}>{children}</Link>;
  }
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
      {children}
    </a>
  );
}

/**
 * Synk footer: brand block left, four link columns (Projects / Pages /
 * Social / Machine), then a hairline bottom bar with dotted edge gutters.
 * Surfaces site.social and site.email per the shared contract.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  const pageLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "AI index", href: "/llms.txt" },
    { label: "Full AI source", href: "/llms-full.txt" },
    { label: "GitHub", href: studioLinks.githubOrg }
  ];

  const machineLinks = site.footerLinks.filter((link) => !link.href.startsWith("/projects/"));

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label={`${site.name} home`}>
              <span className="brand-mark" aria-hidden="true" />
              <span>{site.name}</span>
            </Link>
            <p>{site.description}</p>
            <a className="btn-link" href={studioLinks.emailHref}>
              {site.email}
            </a>
          </div>

          <nav className="footer-col" aria-label="Projects">
            <h2 className="footer-col-title">Projects</h2>
            {projects.map((project) => (
              <Link key={project.slug} href={project.route}>
                {project.shortName}
              </Link>
            ))}
          </nav>

          <nav className="footer-col" aria-label="Pages">
            <h2 className="footer-col-title">Pages</h2>
            {pageLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </nav>

          <nav className="footer-col" aria-label="Social">
            <h2 className="footer-col-title">Social</h2>
            {site.social.map((channel) => (
              <a key={channel.href} href={channel.href} target="_blank" rel="noreferrer noopener">
                {channel.label}
              </a>
            ))}
          </nav>

          <nav className="footer-col" aria-label="Machine-readable">
            <h2 className="footer-col-title">Machine</h2>
            {machineLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>
              © {year} {site.legalName} · One public hub, separate implementation surfaces.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
