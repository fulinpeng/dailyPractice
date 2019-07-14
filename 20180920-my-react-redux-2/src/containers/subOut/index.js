import React, { Component } from 'react';
import {connect} from '../../react-redux'

import SubInner from '../subInner';

class SubOut extends Component {
    render() {
        return <div>
            <h1 style={{ color: this.props.themeColor }}>SubOut</h1>
            <SubInner />
        </div>
    }
}
const mapStateToPropsSubOut = (state) => {
    return {
        themeColor: state.themeColor
    }
}
export default connect(mapStateToPropsSubOut)(SubOut);
