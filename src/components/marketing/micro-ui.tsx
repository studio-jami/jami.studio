import {
  DottedLock,
  GlyphCheck,
  GlyphDoc,
  GlyphSearch,
  GlyphSparkle
} from "@/components/system/pixel-icons";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Synk embeds live product-UI vignettes inside its feature cards. These are
 * our honest equivalents: pure HTML/CSS micro-mockups whose every string is
 * real content from src/content (capabilities, proof points, generated
 * surfaces) — illustration, not fabricated product claims. All loops freeze
 * under prefers-reduced-motion.
 */

const WAVE_HEIGHTS = [
  34, 62, 48, 88, 56, 72, 40, 95, 66, 52, 80, 44, 70, 58, 90, 38, 64, 76, 50, 84, 46, 68, 36, 92,
  60, 54, 78, 42, 86, 74
];

/** Harness — the governed run loop as a console vignette. */
export function RunConsoleMock() {
  const harness = getProject("harness");
  if (!harness) return null;

  return (
    <div className="mock" role="img" aria-label="Illustration of the Harness governed run loop">
      <div className="mock-pad">
        <div className="mock-tabs">
          <span className="mock-tab" data-active="true">
            <span className="mock-tab-dot" aria-hidden="true" />
            Run loop
          </span>
          <span className="mock-tab">Policy</span>
          <span className="mock-tab">Tools</span>
        </div>
        <div className="mock-wave">
          <div className="mock-wave-bars" aria-hidden="true">
            {WAVE_HEIGHTS.map((h, i) => (
              <i key={i} style={{ "--h": h, "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <span className="mock-meta">governed</span>
        </div>
        <div className="mock-row">
          <div className="mock-row-head">
            <span className="mock-chip">policy</span>
            <span>Before every action</span>
          </div>
          <p>{harness.capabilities[0]}.</p>
        </div>
        <div className="mock-row">
          <div className="mock-row-head">
            <span className="mock-chip">run</span>
            <span>Durable state</span>
          </div>
          <p>{harness.capabilities[3]}.</p>
        </div>
      </div>
    </div>
  );
}

/** UI Registry — the trusted render contract as a payload panel. */
export function PayloadPanelMock() {
  const registry = getProject("registry");
  if (!registry) return null;

  return (
    <div className="mock" role="img" aria-label="Illustration of the UI Registry trusted render contract">
      <div className="mock-head">
        <GlyphDoc />
        Trusted render
        <span className="mock-chip">allowlist</span>
      </div>
      <div className="mock-pad">
        <div className="mock-skel" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="mock-check">
          <GlyphCheck className="mock-checkmark" />
          <span>{registry.capabilities[2]}</span>
        </div>
        <div className="mock-check">
          <GlyphCheck className="mock-checkmark" />
          <span>{registry.capabilities[3]}</span>
        </div>
      </div>
      <p className="mock-note">Payloads name resident components — no injected code.</p>
    </div>
  );
}

/** Orchestra — durable work records as an action checklist. */
export function WorkRecordsMock() {
  const orchestra = getProject("orchestra");
  if (!orchestra) return null;

  return (
    <div className="mock" role="img" aria-label="Illustration of Orchestra work records">
      <div className="mock-pad">
        <div className="mock-row-head">
          <span>Work records</span>
        </div>
        <p className="mock-meta">{orchestra.proofPoints[2]}.</p>
        <div className="mock-eq" aria-hidden="true">
          {WAVE_HEIGHTS.map((h, i) => (
            <i key={i} style={{ "--h": h } as React.CSSProperties} />
          ))}
        </div>
        <div className="mock-check">
          <span className="mock-spin" aria-hidden="true" />
          <span>{orchestra.capabilities[0]}</span>
        </div>
        <div className="mock-check">
          <span className="mock-spin" aria-hidden="true" />
          <span>{orchestra.capabilities[1]}</span>
        </div>
        <div className="mock-check">
          <span className="mock-spin" aria-hidden="true" />
          <span>{orchestra.capabilities[3]}</span>
        </div>
      </div>
    </div>
  );
}

/** Intercal — temporal knowledge as a searchable tag cloud. */
export function KnowledgeTagsMock() {
  const tags = [
    "Temporal records",
    "Delta knowledge",
    "Provenance-first",
    "Agent-readable",
    "Freshness",
    "Public surface",
    "Studio family",
    "Source posture"
  ];

  return (
    <div
      className="mock-tags"
      role="img"
      aria-label="Illustration of Intercal temporal knowledge search"
    >
      <span className="mock-spark" aria-hidden="true">
        <GlyphSparkle />
      </span>
      {tags.map((tag) => (
        <span className="tag" key={tag}>
          {tag}
        </span>
      ))}
      <span className="mock-search" aria-hidden="true">
        <GlyphSearch />
        <span className="mock-caret" />
      </span>
    </div>
  );
}

/** The AI index — generated machine-readable surface as a source panel. */
export function SourcePanelMock() {
  return (
    <div className="mock" role="img" aria-label="Illustration of the generated AI index">
      <div className="mock-head">
        <GlyphSparkle />
        llms.txt
        <span className="mock-chip">generated</span>
      </div>
      <div className="mock-pad">
        <div className="mock-tabs" aria-hidden="true">
          <span className="mock-chip">/llms.txt</span>
          <span className="mock-chip">/sitemap.xml</span>
          <span className="mock-chip">/robots.txt</span>
        </div>
        <div className="mock-row">
          <p>{site.home.proof}</p>
        </div>
        <div className="mock-skel" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
      <p className="mock-note">Stable text agents can resolve without scraping.</p>
    </div>
  );
}

/** Trust boundaries — the dotted padlock dot-art. */
export function LockMock() {
  const starRows = ["✳✳✳✳", "✳✳✳", "✳✳✳✳✳", "✳✳✳", "✳✳✳✳", "✳✳✳"];

  return (
    <div className="mock-lock" role="img" aria-label="Illustration of enforced trust boundaries">
      <div className="mock-stars" aria-hidden="true">
        {starRows.slice(0, 3).map((row, i) => (
          <span className="mock-star-group" key={i}>
            {row}
          </span>
        ))}
      </div>
      <DottedLock />
      <div className="mock-stars" aria-hidden="true">
        {starRows.slice(3).map((row, i) => (
          <span className="mock-star-group" key={i}>
            {row}
          </span>
        ))}
      </div>
    </div>
  );
}
