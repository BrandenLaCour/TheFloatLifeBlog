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
        <div className="container category-chosen">
          <h3>Email Bodhi@TheFloat.Life to submit your blog post! :)</h3>
        </div>
      </div>
    </Layout>
  );
};

export default Submit;
