import React, { Component } from 'react'
import PropTypes from 'prop-types'

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        constructor() {
            super()
            this.state = {
                allProps: {}
            }
        }
        static contextTypes = {
            store: PropTypes.object
        }
        componentWillMount() {
            this._updateProps()
            const { store } = this.context
            store.subscribe(() => this._updateProps())
        }
        _updateProps() {
            const { store } = this.context
            let stateProps = mapStateToProps
                ? mapStateToProps(store.getState(), this.props)
                : {} // 防止 mapStateToProps 没有传入
            let dispatchProps = mapDispatchToProps
                ? mapDispatchToProps(store.dispatch, this.props)
                : {} // 防止 mapDispatchToProps 没有传入
            this.setState({
                allProps: { // 整合普通的 props 和从 state 生成的 props
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }

        render() {
            // const { store } = this.context;
            // let stateProps = mapStateToProps(store.getState());
            // // {...stateProps} 意思是把这个对象里面的属性全部通过 `props` 方式传递进去
            // return <WrappedComponent {...stateProps} />
            return <WrappedComponent {...this.state.allProps} />
        }
    }

    return Connect
}

export default connect;