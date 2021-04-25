import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import { Container, Row, Col, Button } from "react-bootstrap";
import ArticlePreview from "../components/article-preview";
import heroStyles from "../components/hero.module.css";
import blogStyles from "./blog-post.module.css";

class BlogPostTemplate extends React.Component {
  state = {
    posts: [],
    filteredPostsMain: [],
    filteredPostsRelated: [],
    category: "",
  };
  componentDidMount() {
    const post = get(this.props, "data.contentfulBlogPost");
    const posts = get(this, "props.data.allContentfulBlogPost.edges");
    const postCategory =
      post.category !== null ? post.category[0].category : null;

    const matchedCategories = posts.filter(({ node }) => {
      if (
        node.category !== null &&
        postCategory === node.category[0].category &&
        node.title !== post.title
      ) {
        return node;
      }
    });

    this.setState({
      posts,
      filteredPostsMain: posts,
      filteredPostsRelated: matchedCategories,
    });
  }

  handleCategoryPopular = (e) => {
    const posts = this.state.posts;
    const filteredByCategory = posts.filter((post) => {
      if (post.node.category !== null && post.node.popular === true) {
        return post;
      }
    });
    this.setState({ filteredPostsMain: filteredByCategory });
  };

  handleCategoryNew = (e) => {
    const posts = this.state.posts;
    const filteredByCategory = posts.filter((post) => {
      if (post.node.category !== null && post.node.new === true) {
        return post;
      }
    });
  };

  render() {
    const post = get(this.props, "data.contentfulBlogPost");
    const posts = get(this, "props.data.allContentfulBlogPost.edges");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const iframe = post.youtubeVideo ? post.youtubeVideo.link : null;
    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <Container className={blogStyles.hero} fluid>
            <h1 className="section-headline mt-4">{post.title}</h1>
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

          <div className="main-titles-container">
            <h2 className="section-headline">Related Blog Posts</h2>
            <h2 className="section-headline">Main Feed</h2>
          </div>
          <div className="main-titles-container mb-4">
            <div>
              <Button
                variant="light"
                value="new"
                onClick={this.handleCategoryNew}
                className={blogStyles.categoryButtons}
              >
                New
              </Button>

              <Button
                variant="dark"
                value="popular"
                onClick={this.handleCategoryPopular}
                className={blogStyles.categoryButtons}
              >
                Popular
              </Button>
            </div>

            <div>
              <Button
                variant="dark"
                value="new"
                onClick={this.handleCategoryNew}
                className={blogStyles.categoryButtons}
              >
                New
              </Button>

              <Button
                variant="dark"
                value="popular"
                onClick={this.handleCategoryPopular}
                className={blogStyles.categoryButtons}
              >
                Popular
              </Button>
            </div>
          </div>
          <div className="container main-container">
            <Container className="preview-container">
              {this.state.filteredPostsRelated.map(({ node }) => {
                return (
                  <Row key={node.slug}>
                    <Col lg={12}>
                      <ArticlePreview article={node} />
                    </Col>
                  </Row>
                );
              })}
            </Container>

            <Container className="preview-container">
              {this.state.filteredPostsMain.map(({ node }) => {
                if (node.title !== post.title) {
                  return (
                    <Row key={node.slug}>
                      <Col lg={12}>
                        <ArticlePreview article={node} />
                      </Col>
                    </Row>
                  );
                } else return null;
              })}
            </Container>
          </div>
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
      category {
        category
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
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          popular
          category {
            category
          }
          author {
            ... on ContentfulAuthor {
              id
              name
            }
          }
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
  }
`;
