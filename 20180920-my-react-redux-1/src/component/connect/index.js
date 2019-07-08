import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default connect = (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }

        // TODO: 如何从 store 取数据？

        render() {
            return <WrappedComponent />
        }
    }

    return Connect
}