import type { Metadata } from "next";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

export default function ProjectsIndexPage() {
  return (
    <>
      <section className="section page-hero">
        <div className="section-number">Studio OSS family</div>
        <h1>Projects</h1>
        <p className="lead" style={{ maxWidth: "58ch", marginTop: "0.75rem" }}>
          Separate products over shared foundations: governed agents, trusted UI, coordination,
          temporal knowledge, and open agent society. Each has its own route, repository, docs,
          and subdomain target.
        </p>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <ShowcaseGrid projects={projects} />
      </section>
    </>
  );
}
