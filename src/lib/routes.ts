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
