
import React, { Component } from "react";

class ImportModule extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('ImportModule-bundle');
    return (
      <div className="import-module">
        <h1>ImportModule content</h1>
      </div>
    );
  }
}

export default ImportModule;
