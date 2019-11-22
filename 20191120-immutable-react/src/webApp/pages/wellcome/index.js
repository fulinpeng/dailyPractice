
import React, { Component } from "react";
import {connect} from "react-redux";
import "./index.scss";

import reduxSagaInjector from '_root/util/reduxSagaInjector'

import store from '../../../store'

class Wellcome extends Component {
  constructor(props) {
    super(props);
  }

  state = {
  }

  componentDidMount() {
    // socket 是不能直接回调的啊要写个reducer自己接收
    reduxSagaInjector('testApisTest1')('testApisTest1', {}, 'TESTAPISTEST1', true)

  }

  componentWillReceiveProps() {
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', this.props.testApisTest1)
  }

  render() {
    return (
      <div className="wellcome">
        <h1>wellcome!</h1>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { testApisTest1 } = state
  return { testApisTest1 }
}

export default connect(mapStateToProps)(Wellcome);
