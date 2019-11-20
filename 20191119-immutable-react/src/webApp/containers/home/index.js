/**
 * @PeoplePanel: 人员信息模块
 **/
import React, { Component } from "react";
import "./index.scss";

import { Button } from 'antd';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
  }

  render() {
    return (
      <div className="home">
        <h1>hello!</h1>
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default Home;
