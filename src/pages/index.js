import React, { useContext } from "react";
import { graphql, Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Layout from "../components/layout";
import logo from "../images/FloatCircle.ico"
import ArticlePreview from "../components/article-preview";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";

const RootIndex = (props) => {
  const siteTitle = get(props, "data.site.siteMetadata.title");
  const posts = get(props, "data.allContentfulBlogPost.edges");
  const [author] = get(props, "data.allContentfulCompany.edges");
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);

  return (
    <Layout location={props.location}>
      <div style={{ background: "#fff" }}>
        <Helmet title={siteTitle} />
        <link rel="apple-touch-icon" sizes="128x128" href={logo}></link>

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
                <Col
                  lg={10}
                  xs={7}
                  onClick={() =>
                    dispatch({
                      type: "CATEGORY",
                      payload: "Saftey and Awareness",
                    })
                  }
                  className="category"
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/categories/"
                  >
                    <h3 className="cat-title">Safety and Awareness</h3>
                  </Link>
                </Col>
              </Row>
              <Row className="justify-content-around">
                <Col
                  lg={7}
                  xs={7}
                  onClick={() =>
                    dispatch({
                      type: "CATEGORY",
                      payload: "Onewheel Lifestyle",
                    })
                  }
                  className="category"
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/categories/"
                  >
                    <h3 className="cat-title">Onewheel Lifestyle</h3>
                  </Link>
                </Col>
              </Row>
              <Row className="justify-content-around">
                <Col
                  lg={10}
                  xs={7}
                  onClick={() =>
                    dispatch({
                      type: "CATEGORY",
                      payload: "Content Creation and Media",
                    })
                  }
                  className="category"
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/categories/"
                  >
                    <h3 className="cat-title">Content Creation and Media</h3>
                  </Link>
                </Col>
              </Row>
              <Row className="justify-content-around">
                <Col lg={7} xs={7} className="category">
                  <Link
                    onClick={() =>
                      dispatch({ type: "CATEGORY", payload: "From The Pros" })
                    }
                    style={{ textDecoration: "none", color: "white" }}
                    to="/categories/"
                  >
                    <h3 className="cat-title">From the Pros</h3>
                  </Link>
                </Col>
              </Row>
              <Row className="justify-content-around">
                <Col lg={7} xs={7} className="category">
                  <Link
                    onClick={() =>
                      dispatch({ type: "CATEGORY", payload: "Tips and Tricks" })
                    }
                    style={{ textDecoration: "none", color: "white" }}
                    to="/categories/"
                  >
                    <h3 className="cat-title">Tips and Tricks</h3>
                  </Link>
                </Col>
              </Row>
              <Row className="justify-content-around">
                <Col lg={7} xs={7} className="category">
                  <Link
                    onClick={() =>
                      dispatch({ type: "CATEGORY", payload: "Everything Else" })
                    }
                    style={{ textDecoration: "none", color: "white" }}
                    to="/categories/"
                  >
                    <h3 className="cat-title">Everything Else</h3>
                  </Link>
                </Col>
              </Row>
              <div className="category-border mb-4"></div>
              <div className="suggested-container mb-3">
                <span className="suggested"> Suggested Articles</span>
              </div>
              {posts.map(({ node }) => {
                return (
                  <Row className="justify-content-around" key={node.slug}>
                    <Col lg={12}>
                      {node.popular ? <ArticlePreview article={node} /> : null}
                    </Col>
                  </Row>
                );
              })}
            </Container>
          </div>
        </div>
      </div>
    </Layout>
  );
};

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
          popular
          author {
            ... on ContentfulAuthor {
              id
              name
            }
          }
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid
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
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;
