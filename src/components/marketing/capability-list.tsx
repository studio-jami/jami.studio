import { Reveal } from "@/components/primitives/reveal";

/** Numbered capability list — structured, scannable, progressive-disclosure feel. */
export function CapabilityList({ items }: { items: string[] }) {
  return (
    <ol className="capability-list">
      {items.map((item, index) => (
        <Reveal as="li" key={item} delay={index * 50} className="capability-item">
          <span className="capability-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="capability-text">{item}</p>
        </Reveal>
      ))}
    </ol>
  );
}
