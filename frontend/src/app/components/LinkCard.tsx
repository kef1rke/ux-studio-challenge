import React, { ReactNode } from "react";
import Link from "next/link";
import styles from "./components.module.css";

interface CustomLinkProps {
  href: string;
  children: ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <button className={styles.card}>{children}</button>
    </Link>
  );
};

export default CustomLink;
