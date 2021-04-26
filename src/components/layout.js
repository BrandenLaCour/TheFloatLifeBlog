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
      </Container>
    );
  }
}

export default Template;
