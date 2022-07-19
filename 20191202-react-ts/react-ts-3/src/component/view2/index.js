import React, { Component, Fragment } from "react";

export default class View2 extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      content: "View2"
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
