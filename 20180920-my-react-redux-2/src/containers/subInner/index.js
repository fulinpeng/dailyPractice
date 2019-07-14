import React, { Component } from 'react';

import {connect} from '../../react-redux'

class SubInner extends Component {
    render() {
        return (
            <p style={{ color: this.props.themeColor }}>SubInner</p>
        )
    }
}
const mapStateToPropsSubInner = (state) => {
    return {
        themeColor: state.themeColor
    }
}
export default connect(mapStateToPropsSubInner)(SubInner);
