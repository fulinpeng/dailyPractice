import React, { Component } from "react";
import "./index.scss";
// 这是原组件，不再需要state，数据全部由高阶组件或者参数提供
class PhoneButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('########--props.data', this.props.data);
    const {className,onClick,text,children} = this.props;
    return (
      <div className={`phone-button-wrap ${className||''}`} >
        <div className="phone-button" onClick={onClick}>{children || text || '确认'}</div>
      </div>
    );
  }
}

export default PhoneButton;
