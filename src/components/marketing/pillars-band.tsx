import type { site } from "@/content/site";

type Pillar = (typeof site)["home"]["pillars"][number];

export function PillarsBand({ pillars }: { pillars: readonly Pillar[] }) {
  return (
    <div className="pillars">
      {pillars.map((pillar) => (
        <article key={pillar.title} className="pillar">
          <h3>{pillar.title}</h3>
          <p>{pillar.body}</p>
        </article>
      ))}
    </div>
  );
}
