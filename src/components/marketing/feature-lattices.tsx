import {
  KnowledgeTagsMock,
  LockMock,
  PayloadPanelMock,
  RunConsoleMock,
  SourcePanelMock,
  WorkRecordsMock
} from "@/components/marketing/micro-ui";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Synk's feature sections: 2×2 dashed lattices (gap=0, single shared seams)
 * pairing copy cells with embedded micro-UI demo cells. Copy comes verbatim
 * from site.home.pillars and real proof points — the mockups illustrate the
 * same surface the words describe.
 */

function CopyCell({ title, body }: { title: string; body: string }) {
  return (
    <article className="cell-copy" data-reveal>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

/** Band 1 — runtime + interfaces: copy row above, demo row below. */
export function FoundationsLattice() {
  const [runtime, interfaces] = site.home.pillars;

  return (
    <div className="lattice cols-2">
      <CopyCell title={runtime.title} body={runtime.body} />
      <CopyCell title={interfaces.title} body={interfaces.body} />
      <div className="cell-demo">
        <RunConsoleMock />
      </div>
      <div className="cell-demo">
        <PayloadPanelMock />
      </div>
    </div>
  );
}

/** Band 2 — coordination + knowledge: demo row above, copy row below. */
export function CoordinationLattice() {
  const [, , coordination, knowledge] = site.home.pillars;

  return (
    <div className="lattice cols-2">
      <div className="cell-demo">
        <WorkRecordsMock />
      </div>
      <div className="cell-demo">
        <KnowledgeTagsMock />
      </div>
      <CopyCell title={coordination.title} body={coordination.body} />
      <CopyCell title={knowledge.title} body={knowledge.body} />
    </div>
  );
}

/** Band 2b — the shared-source + trust pair, after a thin hatch strip. */
export function PostureLattice() {
  const harness = getProject("harness");
  const trustBody = harness
    ? `${harness.proofPoints[0]}. ${harness.proofPoints[1]}.`
    : site.home.proof;

  return (
    <div className="lattice cols-2">
      <div className="cell-demo">
        <SourcePanelMock />
      </div>
      <div className="cell-demo">
        <LockMock />
      </div>
      <CopyCell title="One shared source" body={site.home.proof} />
      <CopyCell title="Boundaries you can trust" body={trustBody} />
    </div>
  );
}
