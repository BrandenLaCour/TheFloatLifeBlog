import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

import styles from "./article-preview.module.css";

export default ({ article }) => (
  <div className={styles.preview}>
    <h3 className={styles.previewTitle}>
      <Link style={{ color: "black" }} to={`/blog/${article.slug}`}>
        {article.title}
      </Link>
    </h3>
    <Link style={{ color: "black" }} to={`/blog/${article.slug}`}>
      <Img style={{ height: "100%" }} alt="" fluid={article.heroImage.fluid} />
    </Link>
    <small className={styles.previewDesc}>{article.publishDate}</small>
    <small
      className={styles.previewDesc}
      style={{fontFamily: "Avenir"}}
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </div>
);
