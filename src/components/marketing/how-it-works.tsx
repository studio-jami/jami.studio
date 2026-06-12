import { Container } from "@/components/ui/layout";
import { GhostBadge } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";
import {
  CoordinationIcon,
  InterfaceIcon,
  LibraryIcon,
  MicIcon,
  PaperclipIcon,
  RuntimeIcon
} from "@/components/ui/icons";

/**
 * HowItWorksSteps (template HowItWorks) — Message AI's "one prompt to begin,
 * three steps to clarity" band: a tall photographic card on the left with a
 * floating chat-input mockup (HTML/CSS), and the numbered 1-2-3 steps on the
 * right, each with an icon and a vertical hairline running the column. Ours
 * tells the real "one shared source" story: govern the runtime → trust the
 * interface → coordinate durably.
 */
const steps = [
  {
    icon: <RuntimeIcon size={20} />,
    title: "Govern",
    body: "Harness turns agent execution into one policy-gated loop where tools, memory, approvals, and model routing share a single contract."
  },
  {
    icon: <InterfaceIcon size={20} />,
    title: "Render",
    body: "The UI Registry gives agents a tokenized component vocabulary they render through — never injected runtime code, always validated props."
  },
  {
    icon: <CoordinationIcon size={20} />,
    title: "Coordinate",
    body: "Orchestra keeps work records, approvals, and squads as durable source, so multi-agent work stays legible long after the chat ends."
  }
];

export function HowItWorksSteps({ id }: { id: string }) {
  return (
    <Container as="div">
      <Reveal className="section-head">
        <GhostBadge>How it works</GhostBadge>
        <h2 id={id}>
          One shared source, <span className="heading-soft">three steps to a trusted system.</span>
        </h2>
      </Reveal>

      <div className="howitworks">
        <Reveal className="howitworks-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/howitworks.png" alt="" className="howitworks-photo" />
          <div className="howitworks-shade" aria-hidden="true" />
          <div className="howitworks-mock" aria-hidden="true">
            <p className="howitworks-mock-prompt">Run an agent through the governed loop</p>
            <div className="howitworks-mock-bar">
              <span className="howitworks-mock-tools">
                <span className="mock-tool">
                  <LibraryIcon size={14} />
                  Library
                </span>
                <PaperclipIcon size={14} />
                <MicIcon size={14} />
              </span>
              <span className="howitworks-mock-send">Send</span>
            </div>
          </div>
        </Reveal>

        <Reveal as="ol" className="steps" delay={90}>
          {steps.map((step, i) => (
            <li className="step" key={step.title}>
              <span className="step-icon" aria-hidden="true">
                {step.icon}
              </span>
              <div className="step-text">
                <h3 className="step-title">
                  <span className="step-number">{i + 1}</span>
                  <span className="step-dash" aria-hidden="true">
                    —
                  </span>
                  {step.title}
                </h3>
                <p className="step-body">{step.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </Container>
  );
}
