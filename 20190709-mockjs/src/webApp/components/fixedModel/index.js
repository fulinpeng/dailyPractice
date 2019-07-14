import React, { Component } from "react";
import "./index.scss";
class FixedModel extends Component {
  constructor(props) {
    super(props);
    this.modelWrap = React.createRef();
  }

  clickHandle =(e)=>{
    const callBack = this.props.onClick || ((e) => e);
    if (e.target == this.modelWrap.current) callBack();
  }

  render() {
    const {className, children} = this.props;
    return (
      <div ref={this.modelWrap} className={`model-wrap ${className||''}`} onClick={this.clickHandle}>
        {React.Children.map(children, child => child)}
      </div>
    );
  }
}

export default FixedModel;
