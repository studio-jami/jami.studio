import type { Metadata } from "next";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Page not found",
  description: "This route does not resolve to a Studio surface."
});

/**
 * Branded 404 over the same page-hero language as the rest of the site, so an
 * unknown route still lands inside the studio instead of on framework chrome.
 */
export default function NotFound() {
  return (
    <section className="page-hero not-found" aria-labelledby="not-found-title">
      <div className="page-hero-glow" aria-hidden="true" />
      <Container>
        <div className="page-hero-inner">
          <Eyebrow>HTTP 404</Eyebrow>
          <h1 id="not-found-title" className="page-hero-title">
            No surface here.
          </h1>
          <p className="page-hero-lead">
            This route does not resolve to anything in the studio. The product family, the project
            index, and the machine-readable map are all one step away.
          </p>
          <div className="page-hero-actions">
            <Button href="/" variant="primary" size="lg" withArrow>
              Back to studio
            </Button>
            <Button href="/projects" variant="secondary" size="lg">
              View projects
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
