import { Container } from "@/components/ui/primitives";
import { SmartLink } from "@/components/ui/smart-link";
import { projects } from "@/content/projects";
import { studioLinks } from "@/content/links";
import { site } from "@/content/site";

/**
 * Organized footer: studio identity + socials + contact email, a Projects column from the
 * project roster, and a Resources column for the AI index / robots / sitemap. Socials and
 * email are shared studio identity surfaced on every lane. All hrefs come from the content
 * layer (`site`, `studioLinks`, project routes).
 */
export function SiteFooter() {
  const resources = [
    { label: "AI index", href: "/llms.txt" },
    { label: "Full AI source", href: "/llms-full.txt" },
    { label: "Robots", href: "/robots.txt" },
    { label: "Sitemap", href: "/sitemap.xml" }
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-inner">
          <div className="footer-brand">
            <SmartLink href="/" className="brand" aria-label={`${site.name} home`}>
              <span className="brand-mark" aria-hidden="true" />
              <span>{site.name}</span>
            </SmartLink>
            <p>{site.description}</p>
            <div className="footer-socials">
              {site.social.map((channel) => (
                <SmartLink key={channel.label} href={channel.href} className="footer-social">
                  {channel.label}
                </SmartLink>
              ))}
              <SmartLink href={studioLinks.emailHref} className="footer-social">
                {site.email}
              </SmartLink>
            </div>
          </div>

          <nav className="footer-col" aria-label="Projects">
            <h3>Projects</h3>
            <ul>
              {projects.map((project) => (
                <li key={project.slug}>
                  <SmartLink href={project.route}>{project.shortName}</SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Resources">
            <h3>Resources</h3>
            <ul>
              {resources.map((item) => (
                <li key={item.href}>
                  <SmartLink href={item.href}>{item.label}</SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {site.legalName}. Open-core foundations for agent-native products.
          </span>
          <SmartLink href="/projects">View all projects</SmartLink>
        </div>
      </Container>
    </footer>
  );
}
