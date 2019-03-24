/**
 * @Test: 测试一下redux、saga
 **/
import React, { Component } from "react";
import "./index.scss";
import { connect } from 'react-redux';
import { INCREMENT, INCREMENT_ASYNC} from '_root/const/index';

class Test extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.props.dispatch({type: INCREMENT})
  }

  onClick2 = () => {
    this.props.dispatch({ type: INCREMENT_ASYNC })
  }

  render() {
    return (
      <div className="test-box">
        <h3 onClick={this.onClick}>点击立刻+1： {this.props.number}</h3>
        <h3 onClick={this.onClick2}>点击2s后+1： {this.props.number}</h3>
      </div>
    );
  }
}

export default connect(
  store => ({
    number: store.number
  })
)(Test);
