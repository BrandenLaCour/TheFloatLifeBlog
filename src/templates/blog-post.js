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
    filter: "newR",
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

    this.setState({
      filteredPostsMain: filteredByCategory,
      filter: e.target.value,
    });
  };

  handleCategoryNew = (e) => {
    const posts = get(this, "props.data.allContentfulBlogPost.edges");
    this.setState({ filteredPostsMain: posts, filter: e.target.value });
  };

  render() {
    const post = get(this.props, "data.contentfulBlogPost");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const iframe = post.youtubeVideo ? post.youtubeVideo.link : null;
    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <Container className={blogStyles.hero} fluid>
            <h1 className="section-headline mt-4">{post.title}</h1>
          </Container>

          <Container className={blogStyles.authorContainer}>
            <Row className={blogStyles.authorWidget}>
              <Col>
                <Img
                  className={heroStyles.heroImageAuthor}
                  alt={post.title}
                  fluid={post.author.profilePicture.fluid}
                />
              </Col>
            </Row>
            <Row className="d-flex flex-column author">
              <Col>{post.author.name}</Col>
              <Col>{post.publishDate}</Col>
            </Row>
          </Container>
          <Container fluid>
            <Row className="justify-content-center mb-2">
              <Col md={6} lg={8}>
                <Img
                  className={heroStyles.heroImageBlog}
                  alt={post.title}
                  fluid={post.heroImage.fluid}
                />
              </Col>
            </Row>
          </Container>
          <Container className="d-flex justify-content-center mt-3">
            <div className={blogStyles.heroImageSeperator}></div>
          </Container>

          <div className="wrapper blog-desc">
            <div
              className="blog-body"
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
            <h2 className="section-headline-blog">Related Blog Posts</h2>
            <h2 className="section-headline-blog">Main Feed</h2>
          </div>
          <div className="main-titles-container mb-4">
            <div>
              <Button
                variant="dark"
                value="newL"
                onClick={this.handleCategoryNew}
                className={
                  this.state.filter === "newL"
                    ? blogStyles.categoryButtonsPicked
                    : blogStyles.categoryButtons
                }
              >
                New
              </Button>

              <Button
                variant="dark"
                value="popularL"
                onClick={this.handleCategoryPopular}
                className={
                  this.state.filter === "popularL"
                    ? blogStyles.categoryButtonsPicked
                    : blogStyles.categoryButtons
                }
              >
                Popular
              </Button>
            </div>

            <div>
              <Button
                variant="dark"
                value="newR"
                onClick={this.handleCategoryNew}
                className={
                  this.state.filter === "newR"
                    ? blogStyles.categoryButtonsPicked
                    : blogStyles.categoryButtons
                }
              >
                New
              </Button>

              <Button
                variant="dark"
                value="popularR"
                onClick={this.handleCategoryPopular}
                className={
                  this.state.filter === "popularR"
                    ? blogStyles.categoryButtonsPicked
                    : blogStyles.categoryButtons
                }
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
      author {
        name
        profilePicture {
          fluid(maxWidth: 1500, resizingBehavior: SCALE) {
            ...GatsbyContentfulFluid_tracedSVG
          }
        }
      }
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
