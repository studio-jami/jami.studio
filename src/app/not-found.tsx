import type { Metadata } from "next";
import { Button } from "@/components/system/button";
import { site } from "@/content/site";

// Branded 404. Without this, Next.js renders its default not-found page, which
// injects `body { background: #fff }` (per prefers-color-scheme) and ignores the
// data-theme attribute — a white body band behind the dark Nocturne header and
// footer whenever the stored theme and the OS preference disagree.
export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
  description: "This route does not exist on the jami.studio public surface."
};

export default function NotFound() {
  return (
    <section className="section page-hero">
      <p className="meta">404</p>
      <h1>Page not found</h1>
      <p className="lead" style={{ marginTop: "0.75rem", maxWidth: "44ch" }}>
        This route is not part of the Studio public surface. Every live route is listed on the
        projects index and in the AI-readable site index.
      </p>
      <div className="button-row">
        <Button href="/" variant="primary">
          Back to home
        </Button>
        <Button href="/projects" variant="secondary">
          View projects
        </Button>
      </div>
    </section>
  );
}
