import { site } from "@/content/site";

export function SignalForgeFooter() {
  return (
    <footer className="forge-footer">
      <div className="forge-footer-inner">
        <div className="forge-footer-brand">
          <strong>{site.name}</strong>
          <p>{site.description}</p>
          <p className="meta forge-footer-handle">Signal Forge · design/rerun-c</p>
        </div>
        <nav aria-label="Footer navigation">
          {site.footerLinks.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}