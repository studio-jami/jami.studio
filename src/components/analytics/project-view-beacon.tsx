"use client";

import { usePostHog } from "@posthog/react";
import { useEffect, useRef } from "react";
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
  const posthog = usePostHog();
  const sent = useRef(false);

  useEffect(() => {
    if (!posthog || sent.current) return;
    sent.current = true;

    if (view === "index") {
      posthog.capture(ANALYTICS_EVENTS.projectIndexView);
    } else {
      posthog.capture(ANALYTICS_EVENTS.projectDetailView, { slug: view });
    }
  }, [posthog, view]);

  return null;
}
