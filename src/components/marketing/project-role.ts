import type { ProjectSlug } from "@/content/projects";

/**
 * Durable, category-style descriptors for each Studio project, keyed by the
 * centralized project slug. These power the badges on project cards and
 * project heroes; they describe what each product IS in the family, so the
 * primary marketing surface never leans on implementation status.
 */
export const projectRole: Record<ProjectSlug, string> = {
  harness: "Agent runtime",
  registry: "UI contract",
  orchestra: "Coordination",
  intercal: "Temporal knowledge",
  collectiva: "Agent society"
};
