"use client";

import { useEffect, useRef } from "react";
import { captureMarketingEvent } from "@/components/analytics/posthog-provider";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

type ProjectViewBeaconProps = {
  /** `project_index` for the `/projects` listing, or a project slug for detail. */
  view: "index" | (string & {});
};

/**
 * Emits the explicit project-view event once per mount:
 *
 * - `view="index"`  → `project_index_view` (the `/projects` listing).
 * - any other value → `project_detail_view` with `{ slug }` (no PII).
 *
 * Mounted from the corresponding Server Component pages. Renders nothing.
 */
export function ProjectViewBeacon({ view }: ProjectViewBeaconProps) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    if (view === "index") {
      captureMarketingEvent(ANALYTICS_EVENTS.projectIndexView);
    } else {
      captureMarketingEvent(ANALYTICS_EVENTS.projectDetailView, { slug: view });
    }
  }, [view]);

  return null;
}
