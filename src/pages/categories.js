import React, { useContext } from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import styles from "./blog.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";

const Categories = (props) => {
  const siteTitle = get(props, "data.site.siteMetadata.title");
  const posts = get(props, "data.allContentfulBlogPost.edges");
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);
  const categoriesNoDupe = [];
  const categories = get(props, "data.allContentfulCategories.edges").map(
    ({ node }) => {
      if (node.category !== null && node.category !== undefined) {
        return node.category;
      }
    }
  );
  categories.forEach((cat) => {
    if (!categoriesNoDupe.includes(cat) && cat !== undefined) {
      categoriesNoDupe.push(cat);
    }
  });

  return (
    <Layout location={props.location}>
      <div style={{ background: "#fff" }}>
        <Helmet title={siteTitle} />
        <div className="blog-title">Categories</div>
        <div className="container main-container">
          <Container className="preview-container">
            {categoriesNoDupe.map((cat, i) => {
              if (cat !== null && i <= categoriesNoDupe.length / 2 - 1) {
                return (
                  <Row className="justify-content-around">
                    <Col className="category" lg={8}>
                      <h2>{cat}</h2>
                    </Col>
                  </Row>
                );
              }
            })}
          </Container>
          <Container className="">
            {categoriesNoDupe.map((cat, i) => {
              if (cat !== null && i > categoriesNoDupe.length / 2 - 1) {
                return (
                  <Row className="justify-content-around">
                    <Col className="category" lg={8}>
                      <h2>{cat}</h2>
                    </Col>
                  </Row>
                );
              }
            })}
          </Container>
        </div>
        <div className="wrapper">
          <div>
            <h2 className="section-headline">You Chose: {state.category}</h2>
          </div>
          <ul className="article-list">
            {posts.map(({ node }) => {
              return (
                <div>
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulCategories(filter: {}) {
      edges {
        node {
          category
        }
      }
    }
  }
`;
