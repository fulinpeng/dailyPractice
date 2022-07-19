import React, { Component } from "react";
import "./index.scss";
class More extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {className, onClick} = this.props;
    return (
      <div className={`more-btn ${className||''}`} onClick={onClick}>
          <div className="point"></div>
          <div className="point"></div>
          <div className="point"></div>
      </div>
    );
  }
}

export default More;
