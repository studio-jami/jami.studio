import { studioLinks } from "./links";
import { projects } from "./projects";

export const site = {
  name: "jami.studio",
  legalName: "Jami Studio",
  canonicalHost: "https://www.jami.studio",
  description:
    "The public hub for the Studio OSS project family: governed agents, trusted UI, orchestration, temporal knowledge, and open agent society.",
  handles: {
    github: "studio-jami",
    npm: "@jami-studio",
    x: "@studio_jami"
  },
  email: studioLinks.email,
  social: [
    { label: "GitHub", href: studioLinks.githubOrg },
    { label: "LinkedIn", href: studioLinks.linkedin },
    { label: "X", href: studioLinks.x },
    { label: "TikTok", href: studioLinks.tiktok }
  ],
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "AI index", href: "/llms.txt" },
    { label: "GitHub", href: studioLinks.githubOrg }
  ],
  home: {
    eyebrow: "OSS foundations for agent-native products",
    title: "jami.studio",
    lead: "A coherent public surface for governed agent runtimes, trusted UI contracts, multi-agent coordination, temporal knowledge, and open agent society.",
    primaryCta: { label: "View projects", href: "/projects" },
    secondaryCta: { label: "Read AI index", href: "/llms.txt" },
    pillars: [
      {
        title: "Governed runtime",
        body: "Harness turns agent execution into a policy-gated, provider-flexible runtime contract."
      },
      {
        title: "Trusted interfaces",
        body: "The UI Registry gives agents a tokenized vocabulary they can use without injecting runtime code."
      },
      {
        title: "Durable coordination",
        body: "Orchestra keeps work records, approvals, and squads separate from the core agent loop."
      },
      {
        title: "Agent-readable knowledge",
        body: "Intercal and Collectiva extend the family into provenance, temporal context, and open governance."
      }
    ],
    proof:
      "Every public route, project link, metadata field, sitemap entry, and AI-ingestion file is generated from shared source data."
  },
  faqs: [
    {
      question: "What does this repository own?",
      answer:
        "This repository owns the public marketing hub, project pages, metadata, sitemap, robots policy, AI-readable files, and shared presentation foundations for the Studio project family."
    },
    {
      question: "Where do the product runtimes live?",
      answer:
        "Harness, Studio UI Registry, Orchestra, Intercal, and Collectiva are separate implementation surfaces. This site links to their routes, repositories, docs, APIs, and subdomains through centralized project metadata."
    },
    {
      question: "Why include AI-readable files?",
      answer:
        "The site publishes compact and expanded AI source files so agents can resolve the product family, public routes, project summaries, and source boundaries from stable generated text."
    }
  ],
  footerLinks: [
    ...projects.map((project) => ({ label: project.shortName, href: project.route })),
    { label: "Robots", href: "/robots.txt" },
    { label: "Sitemap", href: "/sitemap.xml" }
  ]
} as const;
