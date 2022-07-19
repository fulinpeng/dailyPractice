import React, { Component, Fragment } from "react";

export default class View1 extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      content: "View1"
    };
  }

  render() {
    return (
      <Fragment>
          {this.state.content}
      </Fragment>
    );
  }
}
