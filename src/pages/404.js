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

const Submit = (props) => {
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);

  return (
    <Layout location={props.location}>
      <div style={{ background: "#fff" }}>
        <div className="blog-title">404 </div>
        <div className="container category-chosen">
          Oops! Looks like you got off track friend! That page doesn't exist
        </div>
      </div>
    </Layout>
  );
};

export default Submit;
