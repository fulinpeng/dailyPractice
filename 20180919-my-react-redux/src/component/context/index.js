import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css'

class SubInner extends Component {
  static contextTypes = {
    bgColor: PropTypes.string
  }

  render() {
    return (
      <p style={{ color: this.context.bgColor }}>SubInner</p>
    )
  }
}

class SubOut extends Component {
  static contextTypes = {
    bgColor: PropTypes.string
  }

  render() {
    return <div>
      <h1 style={{ color: this.context.bgColor }}>SubOut</h1>
      <SubInner />
    </div>
  }
}

class Context extends Component {
  // getChildContext 方法和 childContextTypes 是必须的
  // 子组件的 contextTypes 也是必须的
  static childContextTypes = {
    bgColor: PropTypes.string
  }

  constructor() {
    super()
    this.state = { bgColor: 'orange' }
  }

  getChildContext() {
    return { bgColor: this.state.bgColor }
  }

  render() {
    return (
      <div className="context">
        <SubOut />
      </div>
    );
  }
}


export default Context;
