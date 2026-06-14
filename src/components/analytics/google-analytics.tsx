"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID, gaEnabled } from "@/lib/analytics";

/**
 * GA4 (marketing web stream) via gtag.js, loaded with `next/script` using the
 * `afterInteractive` strategy so it never blocks first paint. Renders nothing
 * when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is absent.
 *
 * `anonymize_ip` is set for a privacy-leaning, consent-friendly default; no
 * PII is sent. App Router page navigations are SPA transitions — gtag's
 * `send_page_view` (default true) records the initial load, and PostHog owns
 * the per-navigation funnel events, so we do not double-instrument GA here.
 */
export function GoogleAnalytics() {
  if (!gaEnabled || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
