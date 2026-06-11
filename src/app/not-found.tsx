import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <Container width="default">
      <div className={styles.wrap}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This route is not in the family</h1>
        <p className={styles.lead}>
          The page you are looking for does not exist on the Studio hub. Head back to the project
          index or the homepage.
        </p>
        <div className={styles.actions}>
          <Button href="/" variant="primary" withArrow>
            Back to home
          </Button>
          <Button href="/projects" variant="secondary">
            View projects
          </Button>
        </div>
      </div>
    </Container>
  );
}
