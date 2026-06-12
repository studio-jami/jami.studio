import Image from "next/image";
import { Container } from "@/components/layout/container";
import { BandLabel } from "@/components/system/band-label";

/**
 * Blogs slot → the AI-readable index as three editorial cards (template's blog-card
 * rhythm: image, title, mono meta line) using our generated blog-1..3 imagery. No posts
 * are invented — each card is a REAL machine-readable surface of this site, and the mono
 * meta line carries the route instead of a fake date.
 */
export function AIIndexCallout() {
  const cards = [
    {
      image: "/assets/blog-1.png",
      alt: "Editorial still life — bottle on an orange ground",
      title: "llms.txt — the compact index agents read first",
      href: "/llms.txt",
      meta: "/llms.txt"
    },
    {
      image: "/assets/blog-2.png",
      alt: "Editorial still life — draped fabric in beige light",
      title: "llms-full.txt — the expanded per-project source bundle",
      href: "/llms-full.txt",
      meta: "/llms-full.txt"
    },
    {
      image: "/assets/blog-3.png",
      alt: "Editorial abstraction — green flowing form",
      title: "sitemap.xml — every public route, generated from one source",
      href: "/sitemap.xml",
      meta: "/sitemap.xml"
    }
  ];

  return (
    <section aria-labelledby="aiindex-heading" className="aiindex-section section">
      <BandLabel word="AI index" count={cards.length} id="aiindex-heading" />
      <Container>
        <ul className="index-cards">
          {cards.map((card) => (
            <li key={card.href}>
              <a className="index-card" href={card.href}>
                <span className="index-card-media">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={1024}
                    height={1024}
                    sizes="(max-width: 768px) 90vw, 30vw"
                  />
                </span>
                <span className="index-card-title">{card.title}</span>
                <span className="index-card-meta">{card.meta}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
