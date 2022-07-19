
import React, { Component } from "react";
import "./index.scss";

import RouteConfigExample from '../../app'

class PageContent extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <section className="page-content">
        {/* {this.props.children} */}
        {/* <RouteConfigExample/> */}
      </section>
    );
  }
}

export default PageContent;