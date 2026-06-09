import type { site } from "@/content/site";

type Faq = (typeof site)["faqs"][number];

export function FAQ({ items }: { items: readonly Faq[] }) {
  return (
    <div className="faq-list" role="list">
      {items.map((item) => (
        <div key={item.question} className="faq-item" role="listitem">
          <div className="faq-question">{item.question}</div>
          <div className="faq-answer">{item.answer}</div>
        </div>
      ))}
    </div>
  );
}
