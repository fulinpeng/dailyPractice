import React, { Component } from "react";
import "./index.scss";
class PhoneButton extends Component {
  constructor(props) {
    super(props);
  }
  state = {
  }

  render() {
    const {className,onClick,text,children} = this.props;
    return (
      <div className={`phone-button-wrap ${className||''}`} >
        <div className="phone-button" onClick={onClick}>{children || text || '确认'}</div>
      </div>
    );
  }
}

export default PhoneButton;
