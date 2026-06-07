import type { Metadata } from "next";
import { MetricsStrip } from "@/components/signal-forge/metrics-strip";
import { SignalForgeProjectCard } from "@/components/signal-forge/project-card";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

export default function ProjectsPage() {
  const liveCount = projects.filter((project) => project.internalStatus === "live").length;

  return (
    <section className="section forge-page-hero">
      <div className="section-heading">
        <p className="meta">Studio OSS family</p>
        <h1>Projects</h1>
        <p>
          The Studio family is modeled as separate products over shared foundations. This site keeps
          their public routes, repositories, docs, APIs, and AI summaries in one source-owned
          registry.
        </p>
        <MetricsStrip
          items={[
            { label: "Total", value: `${projects.length} projects` },
            { label: "Live", value: `${liveCount} surface${liveCount === 1 ? "" : "s"}` },
            { label: "Contract", value: "Registry-driven" }
          ]}
        />
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <SignalForgeProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}