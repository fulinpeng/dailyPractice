
import React, { Component } from "react";
import "./index.scss";

import { Button } from 'antd';

class Wellcome extends Component {
  constructor(props) {
    super(props);
  }

  state = {
  }

  render() {
    return (
      <div className="wellcome">
        <h1>wellcome!</h1>
      </div>
    );
  }
}

export default Wellcome;
