import Link from "next/link";
import { AppLink } from "@/components/ui/app-link";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects";
import { studioLinks } from "@/content/links";
import { site } from "@/content/site";

const resourceLinks = [
  { label: "Projects", href: "/projects" },
  { label: "AI index", href: "/llms.txt" },
  { label: "Full AI source", href: "/llms-full.txt" },
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "Robots", href: "/robots.txt" }
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <Link href="/" className="brand" aria-label="jami.studio home">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark-cell" />
                <span className="brand-mark-cell" />
                <span className="brand-mark-cell" />
                <span className="brand-mark-cell" />
              </span>
              <span className="brand-word">{site.name}</span>
            </Link>
            <p>{site.description}</p>
            <a className="footer-email" href={studioLinks.emailHref}>
              {site.email}
            </a>
          </div>

          <div className="site-footer-cols">
            <div className="footer-col">
              <p className="footer-col-title">Projects</p>
              <ul>
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link href={project.route}>{project.shortName}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Resources</p>
              <ul>
                {resourceLinks.map((item) => (
                  <li key={item.href}>
                    <AppLink href={item.href}>{item.label}</AppLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Studio</p>
              <ul>
                {site.social.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} target="_blank" rel="noreferrer noopener">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p className="footer-note">
            Canonical public surface for developers, agents, and the Studio project family.
          </p>
          <p className="footer-fine">© {year} {site.legalName}. Open-core, agent-native.</p>
        </div>
      </Container>
    </footer>
  );
}
