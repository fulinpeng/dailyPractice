import React, { Component } from 'react'

export default (WrappedComponent, data) => {
    console.log('WrappedComponent:', WrappedComponent);
    class NewComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {}
            console.log('constructor--', this.props);
        }
        componentWillMount() {
            console.log('WrappedComponent--componentWillMount');
            this.setState({
                data: {
                    ...data,
                    ...this.props.data, // 在这里不能获取props.data为什么呢？super你没传参数
                }
            });
        }
        render() {
            return <WrappedComponent data={this.state.data}/>
        }
    }
    return NewComponent
}