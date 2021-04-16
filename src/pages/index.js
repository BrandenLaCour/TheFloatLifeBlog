import React from "react";
import { graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Hero from "../components/hero";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const posts = get(this, "props.data.allContentfulBlogPost.edges");
    const [author] = get(this, "props.data.allContentfulCompany.edges");

    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={siteTitle} />

          <div className="blog-title">TFL Blog</div>

          <div className="wrapper container">
            <div className="main-titles-container">
              <h2 className="section-headline">Blog Posts</h2>
              <h2 className="section-headline">Categories</h2>
            </div>

            <div className="container main-container">
              <Container className="preview-container">
                {posts.map(({ node }) => {
                  return (
                    <Row key={node.slug}>
                      <Col lg={12}>
                        <ArticlePreview article={node} />
                      </Col>
                    </Row>
                  );
                })}
              </Container>
              <Container>
                <Row className="justify-content-around">
                  <Col lg={9} className="category">
                    <h1>Safety and Awareness</h1>
                  </Col>
                </Row>
                <Row className="justify-content-around">
                  <Col lg={7} className="category">
                    <h1>Onewheel Lifestyle</h1>
                  </Col>
                </Row>
                <Row className="justify-content-around">
                  <Col lg={10} className="category">
                    <h1>Content Creation and Media</h1>
                  </Col>
                </Row>
                <Row className="justify-content-around">
                  <Col lg={7} className="category">
                    <h1>From the Pros</h1>
                  </Col>
                </Row>
                <Row className="justify-content-around">
                  <Col lg={7} className="category">
                    <h1>Tips and Tricks</h1>
                  </Col>
                </Row>
                <Row className="justify-content-around">
                  <Col lg={7} className="category">
                    <h1>Everything Else</h1>
                  </Col>
                </Row>
                <div className="category-border"></div>
                <Row className="justify-content-around mt-3">
                  <Col lg={7} className="category">
                    <h1>Everything Else</h1>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query HomeQuery {
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
    allContentfulCompany(filter: { contentful_id: {} }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(maxWidth: 600, maxHeight: 100, resizingBehavior: PAD) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;
