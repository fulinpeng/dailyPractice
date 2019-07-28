
import React, { Component } from "react";
import "./index.scss";
import TestCommonChunk from "_components/testCommonChunk";
class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="account-wrap">
        <h1>Account</h1>
        <TestCommonChunk/>
      </div>
    );
  }
}

export default Account;
