/*
 * @Description: 模板Store主文件，创建store文件
  */

import {
  applyMiddleware,
  compose,
  createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'

let store

// 引入所有reducers
import reducers from '@/reducers'
console.log(reducers)
const history = createHistory()

export default (initialState = {}) => {
  // ======================================================
  // 配置中间件
  // ======================================================
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware, routerMiddleware(history), logger]

  // ======================================================
  // 增强Store
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if(typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension
  }

  // ======================================================
  // 实例化Store，热替换HMR设置
  // ======================================================
  store = createStore(
    reducers(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}
  store.asyncSagas = {}
  store.runSaga = (saga) => {
    sagaMiddleware.run(saga)
  }
  store.history = history

  // 我觉得并不需要这个呢，难道是边写redux的时候不会自动编译整个reducers吗？？？
  // module.hot.accept 这是什么意思啊?????
  if(module.hot) {
    module.hot.accept('@/reducers', () => {
      const reducersHot = require('@/reducers').default
      store.replaceReducer(reducersHot(store.asyncReducers))
    })
  }

  return store
}

export {store}
