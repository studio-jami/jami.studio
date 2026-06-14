import { describe, expect, it } from "vitest";
import {
  ANALYTICS_EVENTS,
  isOutboundHref,
  outboundChannel,
  outboundDestination,
  posthogIngestHost
} from "@/lib/analytics";
import { studioLinks } from "@/content/links";
import { projects } from "@/content/projects";

describe("analytics event contract", () => {
  it("exposes the four explicit, snake_case named events", () => {
    expect(ANALYTICS_EVENTS).toEqual({
      pageView: "page_view",
      projectIndexView: "project_index_view",
      projectDetailView: "project_detail_view",
      outboundCtaClick: "outbound_cta_click"
    });
  });
});

describe("outbound href classification", () => {
  it("treats off-site http(s) and mailto links as outbound", () => {
    expect(isOutboundHref(studioLinks.githubOrg)).toBe(true);
    expect(isOutboundHref(studioLinks.linkedin)).toBe(true);
    expect(isOutboundHref(studioLinks.emailHref)).toBe(true);
    expect(isOutboundHref("mailto:hello@jami.studio")).toBe(true);
  });

  it("treats internal routes and generated text endpoints as not outbound", () => {
    expect(isOutboundHref("/")).toBe(false);
    expect(isOutboundHref("/projects")).toBe(false);
    expect(isOutboundHref("/projects/harness")).toBe(false);
    expect(isOutboundHref("/llms.txt")).toBe(false);
    expect(isOutboundHref("/sitemap.xml")).toBe(false);
    expect(isOutboundHref("/robots.txt")).toBe(false);
  });

  it("classifies every project subdomain/repo/docs link as outbound", () => {
    for (const project of projects) {
      expect(isOutboundHref(project.domainTarget)).toBe(true);
      expect(isOutboundHref(project.repoUrl)).toBe(true);
      expect(isOutboundHref(project.docsUrl)).toBe(true);
    }
  });
});

describe("outbound channel labelling (non-PII)", () => {
  it("labels mailto as email and strips www from hostnames", () => {
    expect(outboundChannel("mailto:hello@jami.studio")).toBe("email");
    expect(outboundChannel("https://www.linkedin.com/in/jami-studio/")).toBe("linkedin.com");
    expect(outboundChannel("https://github.com/studio-jami")).toBe("github.com");
  });

  it("never throws on a malformed href", () => {
    expect(outboundChannel("not a url")).toBe("external");
  });
});

describe("outbound destination labelling (non-PII)", () => {
  it("does not emit email addresses for mailto links", () => {
    expect(outboundDestination("mailto:hello@jami.studio")).toBe("email");
  });

  it("strips path, query, and fragment from external URLs", () => {
    expect(outboundDestination("https://www.linkedin.com/in/jami-studio/?trk=email#bio")).toBe(
      "https://linkedin.com"
    );
    expect(outboundDestination("https://github.com/studio-jami/registry?tab=readme")).toBe(
      "https://github.com"
    );
  });

  it("never throws on a malformed href", () => {
    expect(outboundDestination("not a url")).toBe("external");
  });
});

describe("posthog ingest-host derivation (events must reach the ingestion host)", () => {
  it("rewrites the US app host to the US ingestion host", () => {
    // The bug this guards: api_host = app host silently drops every event,
    // because posthog-js only auto-rewrites the legacy app.posthog.com value.
    expect(posthogIngestHost("https://us.posthog.com")).toBe("https://us.i.posthog.com");
  });

  it("rewrites the EU app host to the EU ingestion host", () => {
    expect(posthogIngestHost("https://eu.posthog.com")).toBe("https://eu.i.posthog.com");
  });

  it("rewrites the legacy app.posthog.com host to the US ingestion host", () => {
    expect(posthogIngestHost("https://app.posthog.com")).toBe("https://us.i.posthog.com");
  });

  it("leaves an already-correct ingestion host unchanged", () => {
    expect(posthogIngestHost("https://us.i.posthog.com")).toBe("https://us.i.posthog.com");
    expect(posthogIngestHost("https://eu.i.posthog.com")).toBe("https://eu.i.posthog.com");
  });

  it("tolerates a trailing slash and leaves self-hosted hosts as-is", () => {
    expect(posthogIngestHost("https://us.posthog.com/")).toBe("https://us.i.posthog.com");
    expect(posthogIngestHost("https://ph.example.com")).toBe("https://ph.example.com");
  });
});
