import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";

function isExternal(href: string) {
  return href.startsWith("http");
}

const utilityLinks = site.footerLinks.filter((link) => !link.href.startsWith("/projects/"));

/** Organized footer: brand statement, product family column, utility links, fine print. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="site-footer-brand">
          <Link href="/" className="brand" aria-label="jami.studio home">
            <BrandMark />
            <span className="brand-word">{site.name}</span>
          </Link>
          <p className="site-footer-blurb">{site.description}</p>
          <div className="site-footer-handles">
            <a href={studioLinks.githubOrg} rel="noreferrer noopener" className="handle-link">
              GitHub · {site.handles.github}
            </a>
            <span className="handle-link">npm · {site.handles.npm}</span>
            <span className="handle-link">{site.handles.x}</span>
          </div>
        </div>

        <nav className="site-footer-col" aria-label="Project family">
          <p className="site-footer-col-title">Projects</p>
          <ul>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={project.route}>{project.shortName}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer-col" aria-label="Site">
          <p className="site-footer-col-title">Resources</p>
          <ul>
            {site.nav.map((item) =>
              isExternal(item.href) ? (
                <li key={item.href}>
                  <a href={item.href} rel="noreferrer noopener">
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              )
            )}
            {utilityLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container site-footer-base">
        <p>
          © {year} {site.legalName}. Open-core foundations for agent-native products.
        </p>
        <p>Canonical surface for developers, agents, and the Studio project family.</p>
      </div>
    </footer>
  );
}
