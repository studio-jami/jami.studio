import Link from "next/link";
import type { Route } from "next";
import { BrandMark } from "@/components/layout/brand-mark";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

function FooterLink({ href, label }: { href: string; label: string }) {
  const internalPage = href.startsWith("/") && !href.includes(".");
  if (internalPage) {
    return (
      <Link href={href as Route} className="footer__link">
        {label}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className="footer__link"
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {label}
    </a>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container container--wide">
        <div className="footer__top">
          <div className="footer__brand">
            <BrandMark size="lg" />
            <p className="footer__blurb">{site.description}</p>
            <div className="footer__handles">
              <a
                href={`https://github.com/${site.handles.github}`}
                className="footer__handle"
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub ↗
              </a>
              <span className="footer__handle footer__handle--static">{site.handles.npm}</span>
              <span className="footer__handle footer__handle--static">{site.handles.x}</span>
            </div>
          </div>

          <div className="footer__nav">
            <div className="footer__col">
              <p className="footer__heading">Projects</p>
              {projects.map((project) => (
                <FooterLink key={project.slug} href={project.route} label={project.name} />
              ))}
            </div>
            <div className="footer__col">
              <p className="footer__heading">Index</p>
              <FooterLink href="/projects" label="All projects" />
              <FooterLink href="/llms.txt" label="AI index" />
              <FooterLink href="/llms-full.txt" label="AI source" />
              <FooterLink href="/sitemap.xml" label="Sitemap" />
              <FooterLink href="/robots.txt" label="Robots" />
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__fine">
            © {year} {site.legalName}. Open-core foundations for agent-native products.
          </p>
          <p className="footer__fine footer__fine--muted">
            Routes, links, and metadata generated from shared source data.
          </p>
        </div>
      </div>
    </footer>
  );
}
