import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { absoluteUrl, publicRoutes } from "@/lib/routes";

export function createLlmsTxt(): string {
  const routes = publicRoutes()
    .map((route) => `- [${route.label}](${absoluteUrl(route.path)}): ${route.description}`)
    .join("\n");

  const projectSummaries = projects
    .map((project) => `- ${project.name}: ${project.aiSummary}`)
    .join("\n");

  return `# ${site.name}

${site.description}

## Public Routes

${routes}

## Project Summaries

${projectSummaries}

## Source Policy

This site is the marketing and OSS hub. Runtime implementations live in their owning repositories and subdomains. Public routes, metadata, sitemap entries, and this file are generated from centralized content data.
`;
}

export function createLlmsFullTxt(): string {
  const projectsBlock = projects
    .map(
      (project) => `## ${project.name}

Route: ${absoluteUrl(project.route)}
Subdomain target: ${project.domainTarget}
Repository: ${project.repoUrl}
Docs: ${project.docsUrl}
API: ${project.apiUrl ?? "No public API URL listed"}

Summary: ${project.summary}

Positioning: ${project.positioning}

Audience: ${project.audience}

Capabilities:
${project.capabilities.map((item) => `- ${item}`).join("\n")}

Proof points:
${project.proofPoints.map((item) => `- ${item}`).join("\n")}
`
    )
    .join("\n");

  return `# ${site.name} Full Agent Source

${site.description}

Canonical host: ${site.canonicalHost}
GitHub: https://github.com/${site.handles.github}
NPM scope: ${site.handles.npm}

${projectsBlock}
`;
}
