
import React, { Component } from "react";
import "./index.scss";
class Courses extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="courses-wrap">
        <h1>Courses</h1>
        <img src="http://localhost:3000/index/addition"/>
      </div>
    );
  }
}

export default Courses;
