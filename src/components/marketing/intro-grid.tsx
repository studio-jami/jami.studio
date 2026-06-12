import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/system/reveal";
import { site } from "@/content/site";

/**
 * Intro — Nouva's "three shifts" 3-column feature-card grid. Carries the first three
 * `site.home.pillars` as the shifts that change how agent-native teams build. Each is a
 * charcoal Surface card on the void with a small accent glyph.
 */
const glyphs = [
  // Governed runtime — shield
  <path key="shield" d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
  // Trusted interfaces — layers
  <>
    <path key="l1" d="M12 3l9 5-9 5-9-5 9-5z" />
    <path key="l2" d="M3 13l9 5 9-5" />
  </>,
  // Durable coordination — flow
  <>
    <circle key="c1" cx="6" cy="6" r="2.5" />
    <circle key="c2" cx="18" cy="18" r="2.5" />
    <path key="p" d="M6 8.5V14a4 4 0 004 4h5.5" />
  </>
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

        <div className="feature-cards">
          {shifts.map((shift, index) => (
            <Reveal as="article" className="feature-card" key={shift.title} delay={index * 80}>
              <span className="feature-card-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {glyphs[index]}
                </svg>
              </span>
              <h3 className="feature-card-title">{shift.title}</h3>
              <p className="feature-card-body">{shift.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
