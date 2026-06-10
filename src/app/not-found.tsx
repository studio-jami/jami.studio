import type { Metadata } from "next";
import { Atmosphere } from "@/components/layout/atmosphere";
import { ButtonLink } from "@/components/ui/button";
import { Shell } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Not found | jami.studio",
  description: "No public surface exists at this route."
};

export default function NotFound() {
  return (
    <section className="page-hero not-found" aria-label="Page not found">
      <Atmosphere variant="hero" />
      <Shell className="page-hero-inner">
        <p className="eyebrow">404</p>
        <h1 className="page-title">
          Off the <em className="page-title-em">index</em>.
        </h1>
        <p className="page-lead">
          No public surface exists at this route. The studio index lists every published page.
        </p>
        <div className="hero-actions">
          <ButtonLink href="/" variant="primary">
            Back to the studio
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            View projects
          </ButtonLink>
        </div>
      </Shell>
    </section>
  );
}
