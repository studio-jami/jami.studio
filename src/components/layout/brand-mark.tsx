import Image from "next/image";
import mark from "../../../public/brand/jami-mark.png";

/**
 * The official jami.studio mark: the illustrated studio portrait (round
 * glasses, soft waves, ribbon-bow choker) presented as a circular cameo with
 * a hairline ring. Source variants live in `public/brand/`; the cameo crop is
 * generated from the ivory variant so it sits on both themes.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src={mark}
      alt=""
      aria-hidden="true"
      width={28}
      height={28}
      className={className ? `brand-mark ${className}` : "brand-mark"}
      priority
    />
  );
}

/** Wordmark with the branch signature: roman root, italic-serif suffix. */
export function Wordmark({ text }: { text: string }) {
  const dotIndex = text.indexOf(".");
  if (dotIndex === -1) {
    return <span className="wordmark-text">{text}</span>;
  }

  return (
    <span className="wordmark-text">
      {text.slice(0, dotIndex)}
      <em className="wordmark-tail">{text.slice(dotIndex)}</em>
    </span>
  );
}
