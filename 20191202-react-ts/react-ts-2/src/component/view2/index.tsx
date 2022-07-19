import React, { Component, Fragment } from "react";

export default class View2 extends Component<{}, {content: string}> {
  constructor(props) {
    super(props);
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
