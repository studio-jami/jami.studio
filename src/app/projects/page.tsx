import type { Metadata } from "next";
import { CTABand } from "@/components/marketing/cta-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects";
import { studioLinks } from "@/content/links";
import { createMetadata } from "@/lib/metadata";
import styles from "./projects.module.css";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

export default function ProjectsPage() {
  return (
    <>
      <header className={styles.hero}>
        <Container width="wide">
          <p className={styles.eyebrow}>Studio OSS family · {projects.length} products</p>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.lead}>
            Separate products over shared foundations: governed agents, trusted UI, multi-agent
            coordination, temporal knowledge, and open agent society. Each links to its own
            repository, docs, and live route.
          </p>
        </Container>
      </header>

      <ShowcaseGrid layout="flat" showHeading={false} />

      <CTABand
        eyebrow="Go deeper"
        title="One foundation, five surfaces"
        description="Open any project for its capabilities, proof posture, and live links — or read the full AI source bundle."
        actions={[
          { label: "Read AI index", href: "/llms.txt", variant: "primary", withArrow: true },
          { label: "GitHub org", href: studioLinks.githubOrg, variant: "secondary", external: true }
        ]}
      />
    </>
  );
}
