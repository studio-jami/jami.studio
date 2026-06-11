import Link from "next/link";
import { site } from "@/content/site";
import styles from "./wordmark.module.css";

/** The studio wordmark + framed mark — links home. */
export function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/" className={styles.brand} aria-label={`${site.name} home`} onClick={onNavigate}>
      <span className={styles.mark} aria-hidden="true">
        <span className={styles.markDot} />
      </span>
      <span className={styles.word}>
        jami<span className={styles.dot}>.</span>studio
      </span>
    </Link>
  );
}
