import { describe, expect, it } from "vitest";
import { ANALYTICS_EVENTS, isOutboundHref, outboundChannel } from "@/lib/analytics";
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
