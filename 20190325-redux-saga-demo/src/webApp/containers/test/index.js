/**
 * @Test: 测试一下redux、saga
 **/
import React, { Component } from "react";
import "./index.scss";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { INCREMENT, INCREMENT_ASYNC} from '_root/const/index';
import { increment, increment2, subduction } from '_root/actions/index';
import store from '_root/store/index';

class Test extends Component {
  constructor(props) {
    super(props);
  }

  incrementHandle = () => {
    this.props.increment();
  }

  increment2Handle = () => {
    this.props.increment2();
  }

  onClick2 = () => {
    // this.props.subduction();
    store.dispatch({type: 'INCREMENT2_ASYNC'})
  }

  render() {
    return (
      <div className="test-box">
        <h3 onClick={this.incrementHandle}>点击立刻+1： {this.props.number}</h3>
        <h3 onClick={this.increment2Handle}>点击立刻+2： {this.props.number}</h3>
        <h3 onClick={this.onClick2}>点击2s后-1： {this.props.number}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('@@@@@@@@@@@@@state', state);
  return {
    number: state.number,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('@@@@@@@@@@@@@ownProps', ownProps);
  return bindActionCreators({
    increment,
    increment2: () => dispatch({type: 'INCREMENT2_ASYNC'}),
    // subduction: () => dispatch({type: 'SUBDUCTION_ASYNC'})
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);