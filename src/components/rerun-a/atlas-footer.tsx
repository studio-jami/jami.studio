import { site } from "@/content/site";

export function AtlasFooter() {
  return (
    <footer className="atlas-footer">
      <div className="atlas-footer-inner">
        <div className="atlas-footer-brand">
          <p className="atlas-eyebrow">Studio OSS family</p>
          <strong className="atlas-footer-title">{site.name}</strong>
          <p className="atlas-footer-copy">{site.description}</p>
        </div>
        <nav className="atlas-footer-nav" aria-label="Footer navigation">
          {site.footerLinks.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="atlas-footer-meta">
        <span>© {new Date().getFullYear()} {site.legalName}</span>
        <span className="atlas-footer-divider" aria-hidden="true">
          ·
        </span>
        <span>Obsidian Atlas direction</span>
      </div>
    </footer>
  );
}