import React, { Component } from "react";
import "./index.scss";
class Textarea extends Component {
  constructor(props) {
    super(props);
  }
  state = {
  }

  render() {
    const {className, onChange, value, defaultValue} = this.props;
    return (
      <div className={`textarea-wrap ${className||''}`}>
        <textarea onChange={onChange} value={typeof value !== 'undefined'?(value || defaultValue || ''):''}></textarea>
      </div>
    );
  }
}

export default Textarea;
