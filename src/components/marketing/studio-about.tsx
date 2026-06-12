import Image from "next/image";
import { site } from "@/content/site";
import { aboutImage } from "@/components/marketing/project-media";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";

const github = site.nav.find((item) => item.label === "GitHub") ?? site.nav[0];

/**
 * Kirimo "About Us": a terra-cotta eyebrow over a giant statement headline
 * (key phrase carries the accent inline), a hairline, then the split —
 * editorial photo + short title on the left, a vertical divider, and the
 * multi-paragraph studio framing on the right with a circle-arrow text CTA.
 * Body copy is the real boundary story from the site FAQs — no invented bio.
 */
export function StudioAbout({ titleId }: { titleId: string }) {
  return (
    <div className="about">
      <Eyebrow>About the studio</Eyebrow>
      <h2 id={titleId} className="about__statement">
        We build <em className="about__accent">open foundations</em> for agent-native products.
      </h2>

      <hr className="about__rule" />

      <div className="about__split">
        <div className="about__side">
          <h3 className="about__side-title">One studio, five surfaces.</h3>
          <div className="about__figure">
            <Image
              src={aboutImage}
              alt="Editorial studio still life in sand and terracotta"
              width={864}
              height={1152}
              sizes="(max-width: 768px) 100vw, 38vw"
              className="about__photo"
            />
          </div>
        </div>

        <Divider vertical />

        <div className="about__body">
          {site.faqs.map((faq) => (
            <p key={faq.question}>{faq.answer}</p>
          ))}
          <Button href={github.href} variant="text" className="about__cta">
            Read the source
          </Button>
        </div>
      </div>
    </div>
  );
}
