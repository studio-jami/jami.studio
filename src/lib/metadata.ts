import type { Metadata } from "next";
import type { StudioProject } from "@/content/projects";
import { site } from "@/content/site";
import { absoluteUrl, projectCanonicalUrl, projectRepositoryUrl } from "@/lib/routes";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function createMetadata({
  title,
  description,
  path = "/",
  image = "/social/jami-studio.svg"
}: MetadataInput): Metadata {
  const fullTitle = title === site.name ? title : `${title} | ${site.name}`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl]
    }
  };
}

export function createProjectMetadata(project: StudioProject): Metadata {
  return createMetadata({
    title: project.name,
    description: project.summary,
    path: project.route,
    image: project.socialImage
  });
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.canonicalHost,
    sameAs: [`https://github.com/${site.handles.github}`]
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.canonicalHost,
    description: site.description
  };
}

export function projectJsonLd(project: StudioProject) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.summary,
    url: projectCanonicalUrl(project),
    codeRepository: projectRepositoryUrl(project),
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: site.canonicalHost
    }
  };
}
