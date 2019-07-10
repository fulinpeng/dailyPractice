/**
 * @Test: 测试一下redux、saga
 **/
import React, { Component } from "react";
import "./index.scss";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { increment, increment2, reduce } from '_root/actions/index';

class TestSaga extends Component {
  constructor(props) {
    super(props);
  }

  incrementHandle = () => {
    // console.log(this.props.increment); // 打印结果：ƒ () { return dispatch(actionCreator.apply(this, arguments));}
    // 再次证明actions文件夹只能放actionCreactor，不能放action对象
    this.props.increment();
  }
  increment2Handle = () => {
    this.props.increment2();
  }

  onClick2 = () => {
    this.props.reduce();
  }

  render() {
    return (
      <div className="test-box">
        <h3 onClick={this.incrementHandle}>点击立刻+1： {this.props.incrementNumber}</h3>
        <h3 onClick={this.increment2Handle}>点击立刻+2： {this.props.incrementNumber}</h3>
        <h3 onClick={this.onClick2}>点击2s后-1： {this.props.reduceNumber}</h3>
      </div>
    );
  }
}

// mapStateToProps会订阅根state，每当分支state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染
const mapStateToProps = state => {
  console.log('@@@@@@@@@@@@@state', state);
  // 你要把哪个值取出来映射到UI组件的props中，你就自己写...
  // 一个reducer产生，会在根state上注册一个分支state，名字就和这个reducer的名字一样的
  // 这个对象，里面也可以写成getReduceNumber这样自己提供的函数，对拿到的state再次加工
  const getReduceNumber = (state) => state.reduce.number + '🍌';
  return {
    incrementNumber: state.increment.number,
    reduceNumber: getReduceNumber(state),
  }
};

// 定义了哪些UI操作应该当作Action，传给 Store
// 本质上还是在UI组件里面发起的Action，只是这里同一放到了reducers文件夹里面去的
// bindActionCreators方法其实是把dispath封装了进去，让我们在UI组件中不用再使用dispatch，
// 所以，传入的必须是actionCreactor，而不是一个action对象
// 看名字就知道了：bindActionCreators😂
const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('@@@@@@@@@@@@@ownProps', ownProps);
  return bindActionCreators({
    increment,
    increment2,
    reduce,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TestSaga);
