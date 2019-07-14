/*
 * @Description: 应用程序主入口文件
  */
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import rootSaga from './sagas'
import './styles/base.scss'

// 渲染前处理
import preLoader from './util/loader/loader'
import mockAPI from './sagas/mockIndex'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = {}
const store = createStore(initialState)
store.runSaga(rootSaga)

// ========================================================
// Mock & Config Setup
// 渲染前设置配置项和mock API，config为子模块配置项
// ========================================================
preLoader.load({
  config: {},
  apis: mockAPI
})

// ========================================================
// 渲染
// ========================================================
const MOUNT_NODE = document.createElement('div')
MOUNT_NODE.setAttribute('id', 'root');

let render = () => {
  ReactDOM.render(
    <AppContainer store={store} />,
    document.body.appendChild(MOUNT_NODE)
  )
}

// webpack热替换
if(module.hot) {
  // 引用Development环境下的render方法
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react').default

    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
  }

  // Wrap render in try/catch
  render = () => {
    try {
      renderApp()
    } catch (error) {
      console.error(error)
      renderError(error)
    }
  }

  // Setup hot module replacement
  module.hot.accept('./containers/AppContainer', () =>
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
  )
}

// ========================================================
// 渲染
// ========================================================
render()
