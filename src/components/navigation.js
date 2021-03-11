import React from "react";
import { Link } from "gatsby";
import styles from "./navigation.module.css";

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">Home</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/">Recent Posts</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/">Pros</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/">Submit a Post</Link>
      </li>
    </ul>
  </nav>
);
