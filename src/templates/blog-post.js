import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import { Container, Row, Col } from "react-bootstrap";

import heroStyles from "../components/hero.module.css";
import blogStyles from "./blog-post.module.css";

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, "data.contentfulBlogPost");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const iframe = post.youtubeVideo ? post.youtubeVideo.link : null;
    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <Container className={blogStyles.hero} fluid>
            <h1 className="section-headline">{post.title}</h1>
          </Container>
          <Container fluid>
            <Row className="justify-content-center">
              <Col md={6} lg={8}>
                <Img
                  className={heroStyles.heroImageBlog}
                  alt={post.title}
                  fluid={post.heroImage.fluid}
                />
              </Col>
            </Row>
          </Container>
          <div className="wrapper">
            <p
              style={{
                display: "block",
              }}
            >
              {post.publishDate}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
          </div>
          {iframe !== null ? (
            <div
              className="video-responsive"
              dangerouslySetInnerHTML={{ __html: iframe }}
            ></div>
          ) : null}
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1500, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      youtubeVideo {
        link
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
