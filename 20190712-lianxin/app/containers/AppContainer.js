/*
 * @Description: 应用程序容器组件主文件
  */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Switch, Route, Redirect } from 'react-router-dom'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import Loadable from 'react-loadable'

import LoadingComponent from '@/components/loading/LoadingComponent'
import LoginContainer from './login/loginContainer'
import ChangePass from './changePass/changePass'

// 按需加载...先看看primaryContainer
const LoadablePrimary = Loadable({
  loader: () => import('./primaryContainer'),
  loading: LoadingComponent,
  delay: 200,
  timeout: 10000
})

class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.shape({
      asyncReducers: PropTypes.object,
      asyncSagas: PropTypes.object,
      dispatch: PropTypes.func,
      getState: PropTypes.func,
      subscribe: PropTypes.func
    }).isRequired
  }

  /**
   * @description 渲染应用主render方法
   * @returns {document} 页面主框架
   * @memberof AppContainer
   */
  render() {
    const { store } = this.props

    return (
      <Provider store={store}>

        <Router>
          <div>
            {
              //<Route path='/auth/login' component={LoginContainer} />
              //<Route path='/auth/changePass' component={ChangePass} />
            }
            <Route path='/' component={LoadablePrimary} />
            {
              /*<AuthorizedRoute path='/app' component={LoadablePrimary} />*/
              //<Redirect to='/auth/login' />
              //<Redirect to='/app' />
            }
          </div>
        </Router>
      </Provider>
    )
  }
}

export default AppContainer

