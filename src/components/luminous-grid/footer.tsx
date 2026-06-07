import { site } from "@/content/site";

export function LuminousFooter() {
  return (
    <footer className="lg-footer">
      <div className="lg-footer-inner">
        <div className="lg-footer-brand">
          <strong>{site.name}</strong>
          <p>{site.description}</p>
        </div>
        <nav className="lg-footer-nav" aria-label="Footer navigation">
          {site.footerLinks.map((item) => (
            <a key={item.href} href={item.href} className="lg-footer-link">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="lg-footer-meta">
        <span>@{site.handles.github}</span>
        <span>{site.handles.npm}</span>
      </div>
    </footer>
  );
}