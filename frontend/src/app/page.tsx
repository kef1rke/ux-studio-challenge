import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import LinkCard from "./components/LinkCard";

export default function Home() {
  return (
    <main className={styles.main}>
      <LinkCard href="/contact">
        <h2 className={styles.title}>Contacts</h2>
      </LinkCard>
    </main>
  );
}
