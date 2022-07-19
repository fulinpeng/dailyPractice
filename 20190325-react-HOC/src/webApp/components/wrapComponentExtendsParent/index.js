import React, { Component } from 'react';

// 这是父组件
export default class WrapComponentExtendsParent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data + '--FromParent'
        }
        console.log('WrapComponentExtendsParent--constructor', props);
    }

    componentDidMount() {
        console.log('WrapComponentExtendsParent--componentDidMount');
    }

    testHandle(){
        console.log('WrapComponentExtendsParent--testHandle');
    }

    render() {
        return (
            <h3>{this.state.data}</h3>
        )
    }
}
