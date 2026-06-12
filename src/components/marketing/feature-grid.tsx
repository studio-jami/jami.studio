import type { ReactNode } from "react";
import { Container } from "@/components/ui/layout";
import { GhostBadge } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";
import {
  ArchiveIcon,
  CheckCircleIcon,
  CoordinationIcon,
  RuntimeIcon,
  SparkIcon
} from "@/components/ui/icons";
import { site } from "@/content/site";

type Chip = {
  icon: ReactNode;
  label: string;
  tone?: "lead" | "default";
};

/**
 * IntroCards (template Features 1) — the three tall photographic cards with
 * floating ghost-pill UI chips, exactly as Message AI stages them: photo fills
 * the 48px-radius card, a translucent chip stack floats on the fog, and the
 * title + description sit BELOW the card. The chip copy narrates each pillar's
 * real mechanics (Harness loop / Registry render contract / Orchestra records)
 * — honest micro-UI, built in HTML/CSS, never an image.
 *
 * Cards carry the first three `site.home.pillars`; the fourth pillar
 * (agent-readable knowledge) is housed verbatim in the WhyItWorks grid.
 */
const cardChips: { photo: string; chips: Chip[] }[] = [
  {
    photo: "/assets/card-trigger.png",
    chips: [
      { icon: <SparkIcon size={14} />, label: "Agent run starts", tone: "lead" },
      { icon: <RuntimeIcon size={14} />, label: "Policy gate approves" },
      { icon: <SparkIcon size={14} />, label: "Tool call executes" },
      { icon: <ArchiveIcon size={14} />, label: "Run state recorded" }
    ]
  },
  {
    photo: "/assets/card-flow.png",
    chips: [
      { icon: <SparkIcon size={14} />, label: "Agent emits payload", tone: "lead" },
      { icon: <CheckCircleIcon size={14} />, label: "Props validated" },
      { icon: <SparkIcon size={14} />, label: "Component rendered" }
    ]
  },
  {
    photo: "/assets/card-guide.png",
    chips: [
      { icon: <ArchiveIcon size={14} />, label: "Work record opened", tone: "lead" },
      { icon: <CheckCircleIcon size={14} />, label: "Approval checkpoint" },
      { icon: <CoordinationIcon size={14} />, label: "Squad run supervised" }
    ]
  }
];

export function IntroCards({ id }: { id: string }) {
  const pillars = site.home.pillars.slice(0, 3);

  return (
    <Container as="div">
      <Reveal className="section-head">
        <GhostBadge>Introducing the Studio</GhostBadge>
        <h2 id={id}>
          Invisible foundations <span className="heading-soft">that make agents shippable.</span>
        </h2>
      </Reveal>

      <div className="intro-grid">
        {pillars.map((pillar, i) => {
          const card = cardChips[i];
          return (
            <Reveal as="article" className="intro-card" key={pillar.title} delay={i * 90}>
              <div className="intro-card-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.photo} alt="" className="intro-card-photo" />
                <div className="intro-card-shade" aria-hidden="true" />
                <div className="chip-stack" aria-hidden="true">
                  {card.chips.map((chip) => (
                    <span
                      className={`ui-chip${chip.tone === "lead" ? " ui-chip-lead" : ""}`}
                      key={chip.label}
                    >
                      <span className="ui-chip-icon">{chip.icon}</span>
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="intro-card-title">{pillar.title}</h3>
              <p className="intro-card-body">{pillar.body}</p>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
