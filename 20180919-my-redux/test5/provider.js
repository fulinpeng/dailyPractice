import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

export default class Provider extends Component {
    getChildContext() {
        return {store: this.props.store}
    }

    constructor() {
        super()
        this.state={}
    }

    render() {
        return this.props.children
    }
}

Provider.childContextTypes={
    store: PropTypes.object
}