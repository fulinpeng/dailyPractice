import React, { Component } from 'react';

const WrapComponentRefs = (TempComponent) => class extends Component {
    componentDidMount() {
        // refs获取组件实例
        console.log('refs--childComponent', this.refs.childComponent)
    }
    render() {
        return (
            <TempComponent ref='childComponent' {...this.props} />
        )
    }
}

export default WrapComponentRefs;