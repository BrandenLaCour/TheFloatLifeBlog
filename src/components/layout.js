import React from "react";
import "./base.css";
import Container from "./container";
import Navigation from "./navigation";
import "../fonts/Evogria.otf";
import GlobalContextProvider from "../context/GlobalContextProvider";

class Template extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <Container>
        <Navigation />
        {children}
        <div className="copywright mt-3 mb-3">
          <span className="mr-2">© 2021 The Float life</span> ||{" "}
          <span className="ml-2">Built with stoke by Branden LaCour</span>
        </div>
      </Container>
    );
  }
}

export default Template;
