import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import styles from "./blog.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const posts = get(this, "props.data.allContentfulBlogPost.edges");
    const categoriesNoDupe = [];
    const categories = get(
      this,
      "props.data.allContentfulCategories.edges"
    ).map(({ node }) => {
      if (node.category !== null && node.category !== undefined) {
        return node.category;
      }
    });
    categories.forEach((cat) => {
      if (!categoriesNoDupe.includes(cat) && cat !== undefined) {
        categoriesNoDupe.push(cat);
      }
    });
    console.log(categoriesNoDupe);
    return (
      <Layout location={this.props.location}>
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
            <h2 className="section-headline">Recent articles</h2>
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
  }
}

export default BlogIndex;

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
