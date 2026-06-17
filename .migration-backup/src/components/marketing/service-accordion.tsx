"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type AccordionItem = {
  title: string;
  body: string;
};

/**
 * Kirimo's signature interaction — the numbered service accordion (01–04).
 * One panel open by default; the open block flips to the terra-cotta accent
 * background with near-black text and carries a circle-arrow text CTA.
 * Closed rows are large sand titles with superscript numbers over hairlines.
 */
export function ServiceAccordion({
  items,
  cta
}: {
  items: readonly AccordionItem[];
  cta: { label: string; href: string };
}) {
  const [open, setOpen] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = open === index;
        const num = String(index + 1).padStart(2, "0");

        return (
          <div key={item.title} className={isOpen ? "accordion__item is-open" : "accordion__item"}>
            <h3 className="accordion__heading">
              <button
                type="button"
                className="accordion__trigger"
                id={`service-trigger-${index}`}
                aria-expanded={isOpen}
                aria-controls={`service-panel-${index}`}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span className="accordion__title">{item.title}</span>
                <sup className="accordion__num" aria-hidden="true">
                  {num}
                </sup>
              </button>
            </h3>
            <div
              id={`service-panel-${index}`}
              role="region"
              aria-labelledby={`service-trigger-${index}`}
              className="accordion__panel"
              hidden={!isOpen}
            >
              <p className="accordion__body">{item.body}</p>
              <Button href={cta.href} variant="text" className="accordion__cta">
                {cta.label}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
