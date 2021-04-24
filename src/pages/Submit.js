import React, { useContext } from "react";
import Layout from "../components/layout";

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
        <div className="blog-title">Submit A Post </div>
        <div className="container category-chosen">(Coming Soon)</div>
      </div>
    </Layout>
  );
};

export default Submit;
