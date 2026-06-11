import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:");
}

function FooterLink({ href, label }: { href: string; label: string }) {
  if (isExternal(href)) {
    return (
      <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer noopener">
        {label}
      </a>
    );
  }
  return <Link href={href as Route}>{label}</Link>;
}

const resourceLinks = [
  { label: "Projects", href: "/projects" },
  { label: "AI index", href: "/llms.txt" },
  { label: "Full agent source", href: "/llms-full.txt" },
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "Robots", href: "/robots.txt" }
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label={`${site.name} home`}>
              <span className="brand-mark" aria-hidden="true" />
              <span>{site.name}</span>
            </Link>
            <p>{site.description}</p>
            <a className="text-link" href={studioLinks.emailHref}>
              {site.email}
            </a>
          </div>

          <div className="footer-col">
            <h3>Projects</h3>
            <nav aria-label="Project links">
              {projects.map((project) => (
                <Link key={project.slug} href={project.route}>
                  {project.shortName}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-col">
            <h3>Resources</h3>
            <nav aria-label="Resource links">
              {resourceLinks.map((item) => (
                <FooterLink key={item.href} href={item.href} label={item.label} />
              ))}
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-note">
            © {year} {site.legalName}. Canonical public surface for the Studio project family.
          </p>
          <div className="footer-social">
            {site.social.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer noopener">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
