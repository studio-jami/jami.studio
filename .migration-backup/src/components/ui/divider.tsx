/**
 * 1px sand hairline — the template's `Divider` frame (Brown 50). Horizontal by
 * default; `vertical` renders the title/body splitting rule.
 */
export function Divider({ vertical = false }: { vertical?: boolean }) {
  return <span aria-hidden="true" className={vertical ? "divider divider--v" : "divider"} />;
}
