import { projects, type StudioProject } from "@/content/projects";
import { site } from "@/content/site";

export type PublicRoute = {
  path: string;
  label: string;
  description: string;
};

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.canonicalHost}${normalized}`;
}

export function projectPath(project: StudioProject): `/projects/${StudioProject["slug"]}` {
  return project.route;
}

export function projectCanonicalUrl(project: StudioProject): string {
  return absoluteUrl(projectPath(project));
}

export function projectSubdomainUrl(project: StudioProject): string | undefined {
  return project.domainTarget;
}

export function projectRepositoryUrl(project: StudioProject): string {
  return project.repoUrl;
}

export function projectDocsUrl(project: StudioProject): string | undefined {
  return project.docsUrl;
}

export function projectApiUrl(project: StudioProject): string | undefined {
  return project.apiUrl;
}

export function projectLinkTargets(project: StudioProject) {
  return [
    { label: "Route", href: projectCanonicalUrl(project), value: projectPath(project) },
    ...(projectSubdomainUrl(project)
      ? [{ label: "Subdomain", href: projectSubdomainUrl(project), value: project.subdomain }]
      : []),
    {
      label: "Repository",
      href: projectRepositoryUrl(project),
      value: projectRepositoryUrl(project)
    },
    ...(projectDocsUrl(project)
      ? [{ label: "Docs", href: projectDocsUrl(project), value: projectDocsUrl(project) }]
      : []),
    ...(projectApiUrl(project)
      ? [{ label: "API", href: projectApiUrl(project), value: projectApiUrl(project) }]
      : [])
  ];
}

export function publicRoutes(): PublicRoute[] {
  return [
    {
      path: "/",
      label: "Home",
      description: site.description
    },
    {
      path: "/projects",
      label: "Projects",
      description: "Project index for the Studio OSS family."
    },
    ...projects.map((project) => ({
      path: project.route,
      label: project.name,
      description: project.summary
    }))
  ];
}
