import React, { Component } from "react";
import "./index.scss";
class Button extends Component {
  constructor(props) {
    super(props);
  }
  state = {
  }

  render() {
    const {className,type,onClick,text} = this.props;
    return (
      <div className={`button-wrap ${className||''}`} >
        <button type={type || 'button'} onClick={onClick}>{text || '确认'}</button>
      </div>
    );
  }
}

export default Button;
