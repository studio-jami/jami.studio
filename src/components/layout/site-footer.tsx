import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{site.name}</strong>
        <p>{site.description}</p>
      </div>
      <nav aria-label="Footer navigation">
        {site.footerLinks.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <p className="footer-note">
        Canonical public surface for developers, agents, and the Studio project family.
      </p>
    </footer>
  );
}
