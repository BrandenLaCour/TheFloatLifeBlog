import React from "react";
import Img from "gatsby-image";

import styles from "./hero.module.css";

export default ({ data }) => (
  <div className={styles.hero}>
    <div className={styles.mainImage}>
      <Img
        className={styles.heroImage}
        alt={data.name}
        fluid={data.heroImage.fluid}
      />
    </div>

    <div className={styles.heroDetails}>
      {/* <h3 className={styles.heroHeadline}>{data.name}</h3>
      <p className={styles.heroTitle}>{data.title}</p>
      <p>{data.shortBio.shortBio}</p> */}
    </div>
  </div>
);
