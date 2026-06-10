import { Reveal } from "@/components/primitives/reveal";
import { site } from "@/content/site";

export function PillarsBand() {
  return (
    <div className="pillars">
      {site.home.pillars.map((pillar, index) => (
        <Reveal key={pillar.title} delay={index * 60} className="pillar">
          <span className="pillar__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="pillar__title">{pillar.title}</h3>
          <p className="pillar__body">{pillar.body}</p>
        </Reveal>
      ))}
    </div>
  );
}
