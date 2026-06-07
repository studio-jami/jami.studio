import type { Metadata } from "next";
import { AtlasProjectsIndex } from "@/components/rerun-a/projects-index";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

export default function ProjectsPage() {
  return <AtlasProjectsIndex />;
}