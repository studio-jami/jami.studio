import { projects } from "@/content/projects";
import { studioLinks } from "@/content/links";
import { site } from "@/content/site";
import { NavLink } from "./nav-link";
import { Wordmark } from "./wordmark";
import styles from "./site-footer.module.css";

const utilityLinks = site.footerLinks.filter(
  (item) => !projects.some((project) => project.route === item.href)
);

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Wordmark />
            <p className={styles.tagline}>{site.description}</p>
            <ul className={styles.social} aria-label="Studio social profiles">
              {site.social.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} className={styles.socialLink}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.linkCol} aria-label="Projects">
            <p className={styles.colTitle}>Projects</p>
            <ul className={styles.linkList}>
              {projects.map((project) => (
                <li key={project.route}>
                  <NavLink href={project.route} className={styles.footerLink}>
                    {project.shortName}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.linkCol} aria-label="Resources">
            <p className={styles.colTitle}>Resources</p>
            <ul className={styles.linkList}>
              <li>
                <NavLink href="/projects" className={styles.footerLink}>
                  All projects
                </NavLink>
              </li>
              <li>
                <NavLink href="/llms.txt" className={styles.footerLink}>
                  AI index
                </NavLink>
              </li>
              <li>
                <NavLink href="/llms-full.txt" className={styles.footerLink}>
                  AI source bundle
                </NavLink>
              </li>
              {utilityLinks.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} className={styles.footerLink}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.linkCol}>
            <p className={styles.colTitle}>Contact</p>
            <ul className={styles.linkList}>
              <li>
                <a href={studioLinks.emailHref} className={styles.footerLink}>
                  {site.email}
                </a>
              </li>
              <li>
                <NavLink href={studioLinks.githubOrg} className={styles.footerLink}>
                  GitHub org
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.wordmarkBand} aria-hidden="true">
          <span className={styles.bigWord}>jami.studio</span>
          <span className={styles.reg}>®</span>
        </div>

        <div className={styles.legal}>
          <p>
            © {year} {site.legalName}. Open-core foundations for agent-native products.
          </p>
          <p className={styles.legalRight}>The public hub for the Studio project family.</p>
        </div>
      </div>
    </footer>
  );
}
