
import React, { Component } from "react";
import "./index.scss";
import TestCommonChunk from "_components/testCommonChunk";
class Courses extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="courses-wrap">
        <h1>Courses</h1>
        <TestCommonChunk/>
        <img src="http://localhost:3000/index/addition"/>
      </div>
    );
  }
}

export default Courses;
