import React, { Component, Fragment } from "react";

export default class View1 extends Component<{}, {content: string}> {
  constructor(props) {
    super(props);
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
