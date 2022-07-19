import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css'

class SubInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeColor: ''
    };
  }

  static contextTypes = {
    store: PropTypes.object
  }

  componentWillMount() {
    this.updateThemeColor();
    const { store } = this.context;
    store.subscribe(this.updateThemeColor.bind(this));
  }

  updateThemeColor() {
    const { store } = this.context;
    const state = store.getState();
    this.setState({ themeColor: state.themeColor });
  }

  render() {
    return (
      <p style={{ color: this.state.themeColor }}>SubInner</p>
    )
  }
}

class SubOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeColor: ''
    };
  }

  static contextTypes = {
    store: PropTypes.object
  }

  componentWillMount() {
    this.updateThemeColor();
    const { store } = this.context;
    store.subscribe(this.updateThemeColor.bind(this));
  }

  updateThemeColor() {
    const { store } = this.context;
    const state = store.getState();
    this.setState({ themeColor: state.themeColor });
  }

  render() {
    return <div>
      <h1 style={{ color: this.state.themeColor }}>SubOut</h1>
      <SubInner />
    </div>
  }
}

class Context extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeColor: ''
    };
  }

  static contextTypes = {
    store: PropTypes.object
  }

  componentWillMount() {
    this.updateThemeColor();
    const { store } = this.context;
    store.subscribe(this.updateThemeColor.bind(this));
  }

  updateThemeColor() {
    const { store } = this.context;
    const state = store.getState();
    this.setState({ themeColor: state.themeColor });
  }

  handleSwitchColor(color) {
    const { store } = this.context;
    store.dispatch({
      type: 'CHANGE_COLOR',
      themeColor: color,
    });
    console.log(store.getState());
  }

  render() {
    return (
      <div className="context">
        <button
          style={{ color: this.state.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
        <button
          style={{ color: this.state.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'orange')}>Orange</button>
        <SubOut />
      </div>
    );
  }
}


export default Context;
