/**
 * @Test: 测试一下redux、saga
 **/
import React, { Component } from "react";
import "./index.scss";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { increment, increment2, subduction } from '_root/actions';
import reduxSagaInjector from '_root/util/reduxSagaInjector';

import store from '_root/store';

class Test extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 那个请求的封装，吧错误吞掉了。。。改改
    // 热加载那个hot什么意思了，什么意义了
    // reduxSagaInjector(store.dispatch, 'testApisTest1')('testApisTest1', null, (res) => {
    //   console.log('testApisTest1-success:', res);
    // });
    reduxSagaInjector(store.dispatch, 'testApisTest2')('testApisTest2', {
      name: 'flp'
    }, 'testApisTest2');

    // 这是一个需要保存到store中的请求
    // reduxSagaInjector(store.dispatch, 'testApisTest3')('testApisTest3', {
    //   name: 'flp-'
    // }, 'testApisTest3');
    // 等请求完毕，在其它地方你就可以使用这个testApisTest3的数据了
    // 你得在 mapStateToProps 中导入，在另一个组件中用啊
    setTimeout(() => {
      console.log('!!!!!!!!!!!!!!!!!!!-setTimeout-store', store.getState());
    }, 2000);
  }

  incrementHandle = () => {
    this.props.increment();
  }

  onClick2 = () => {
    this.props.subduction();
  }

  render() {
    return (
      <div className="test-box">
        <h3 onClick={this.incrementHandle}>点击立刻+1： {this.props.incrementNumber}</h3>
        <h3 onClick={this.onClick2}>点击1s后-1： {this.props.reducerNumber}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('@@@@@@@@@@@@@state', state);
  return {
    incrementNumber: state.increment.number,
    reducerNumber: state.subductionReducer.number,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('@@@@@@@@@@@@@ownProps', ownProps);
  return bindActionCreators({
    increment,
    subduction: () => dispatch({type: 'INCREMENT_ASYNC'}),
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);