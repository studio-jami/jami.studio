import Image from "next/image";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/system/reveal";
import { site } from "@/content/site";

/**
 * Intro — Nouva's "three shifts" cards: a photographic TOP HALF (our generated dusk
 * photography) with a small glass micro-UI panel floating on the photo, then title +
 * body below. The copy carries the first three `site.home.pillars`; the micro-UI panels
 * are decorative HTML/CSS vignettes of each pillar's real behavior (no images, no
 * fabricated metrics — the rows describe the actual contracts).
 */

/** Decorative glass micro-UIs, one per shift. All aria-hidden — pure texture. */
function GateBars() {
  // Mini bar chart: actions flowing through the single enforcement path.
  const bars = [
    { h: "38%", label: "tool" },
    { h: "62%", label: "mem" },
    { h: "50%", label: "route" },
    { h: "84%", label: "act", hot: true },
    { h: "44%", label: "appr" }
  ];
  return (
    <div className="glass" aria-hidden="true">
      <div className="glass-head">
        <span>Policy gate</span>
        <span className="glass-head-dot" />
      </div>
      <div className="glass-bars">
        {bars.map((bar) => (
          <span className="glass-bar" key={bar.label} data-hot={bar.hot ? "true" : undefined}>
            <i style={{ "--bar": bar.h } as React.CSSProperties} />
            <small>{bar.label}</small>
          </span>
        ))}
      </div>
      <p className="glass-caption">Every action through one enforcement path</p>
    </div>
  );
}

function RegistryProgress() {
  // Progress rows: the registry render contract resolving a payload.
  const rows = [
    { label: "Component", value: "resident", fill: "100%" },
    { label: "Props", value: "validated", fill: "76%" },
    { label: "Unknown", value: "fallback", fill: "32%" }
  ];
  return (
    <div className="glass" aria-hidden="true">
      <div className="glass-head">
        <span>Render contract</span>
        <span className="glass-head-dot" />
      </div>
      <div className="glass-progress">
        {rows.map((row) => (
          <span className="glass-progress-row" key={row.label}>
            <span>{row.label}</span>
            <span className="glass-progress-track">
              <i style={{ "--fill": row.fill } as React.CSSProperties} />
            </span>
            <em>{row.value}</em>
          </span>
        ))}
      </div>
      <p className="glass-caption">Agents speak a tokenized vocabulary — never code</p>
    </div>
  );
}

function CoordinationRows() {
  // Breakdown rows: what Orchestra keeps durable, outside the agent loop.
  const rows = [
    { label: "Work records", value: "durable" },
    { label: "Approvals", value: "tracked" },
    { label: "Squads", value: "coordinated" }
  ];
  return (
    <div className="glass" aria-hidden="true">
      <div className="glass-head">
        <span>Outside the loop</span>
        <span className="glass-head-dot" />
      </div>
      <div className="glass-rows">
        {rows.map((row) => (
          <span className="glass-row" key={row.label}>
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </span>
        ))}
      </div>
      <p className="glass-caption">Source of truth, not chat memory</p>
    </div>
  );
}

const media = [
  { src: "/assets/card-1.png", panel: <GateBars /> },
  { src: "/assets/card-2.png", panel: <RegistryProgress /> },
  { src: "/assets/card-3.png", panel: <CoordinationRows /> }
];

export function IntroGrid() {
  const shifts = site.home.pillars.slice(0, 3);

  return (
    <section className="section" aria-labelledby="intro-title">
      <Container>
        <SectionHeading
          eyebrow="What the studio does"
          title={
            <>
              Three shifts that change{" "}
              <span className="title-soft">how agent-native teams build.</span>
            </>
          }
          titleId="intro-title"
          align="center"
        />

        <div className="shift-grid">
          {shifts.map((shift, index) => (
            <Reveal as="article" className="shift-card" key={shift.title} delay={index * 80}>
              <div className="shift-card-media">
                <div className="photo-fill" aria-hidden="true">
                  <Image
                    src={media[index].src}
                    alt=""
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {media[index].panel}
              </div>
              <div className="shift-card-copy">
                <h3 className="shift-card-title">{shift.title}</h3>
                <p className="shift-card-body">{shift.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
