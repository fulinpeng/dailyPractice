import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from '../../react-redux'

import {changeColor} from '../../actions'

import SubOut from '../subOut';

import './index.css'

class Content extends Component {
  static propTypes = {
    themeColor: PropTypes.string,
    onSwitchColor: PropTypes.func
  }

  handleSwitchColor(color) {
    this.props.onSwitchColor && this.props.onSwitchColor(color);
  }

  render() {
    return (
      <div className="context">
        <button
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
        <button
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'orange')}>Orange</button>
        <SubOut />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch(changeColor(color))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
