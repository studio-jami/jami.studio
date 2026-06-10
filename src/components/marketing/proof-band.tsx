import { Atmosphere } from "@/components/layout/atmosphere";
import { Reveal } from "@/components/ui/reveal";
import { Shell } from "@/components/ui/section";
import { site } from "@/content/site";

/**
 * Earned credibility, stated once: the generated-from-source guarantee,
 * with the machine-readable surfaces linked as live proof.
 */
export function ProofBand({ number }: { number: string }) {
  const machineLinks = [
    ...site.nav.filter((item) => item.href.endsWith(".txt")),
    ...site.footerLinks.filter((item) => !item.href.startsWith("/projects"))
  ];

  return (
    <section className="section section--band proof" aria-label="Source-of-truth guarantee">
      <Atmosphere variant="band" />
      <Shell>
        <Reveal>
          <p className="section-mark">
            <span className="section-no">{number}</span>
            <span className="section-kicker">Proof</span>
          </p>
          <blockquote className="proof-statement">
            <p>{site.home.proof}</p>
          </blockquote>
          <ul className="proof-links" aria-label="Machine-readable surfaces">
            {machineLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  {item.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Shell>
    </section>
  );
}
