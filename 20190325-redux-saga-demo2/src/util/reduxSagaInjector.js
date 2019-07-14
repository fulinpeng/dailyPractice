
import { take, call, put } from 'redux-saga/effects'
import store from '../store'
import createAction from './createAction'
import { injectAsyncReducer } from './makeReducer'
import createReducer from './createReducer'
import { fetch, fetchSocket } from './request'

/**
 * http请求
 * @param {string} apiName 获取数据的api名称
 * @param {object} params 请求参数
 */
const apifetch = (apiName, params, callback) => {
  const axiosPromise = fetch(apiName, params)
  if (callback) {
    axiosPromise.then(callback)
  }
  return axiosPromise
}

/**
 * 生成http请求的saga
 * @param {string} apiName 获取数据的api名称
 * @param {object} params 请求参数
 * @param {string} requestAction 监听请求的action的type值
 * @param {function} successActionFun 数据成功返回后触发的action的生成器
 */
function* httpSaga(apiName, params, requestAction, successActionFun, callback) {
  try {
    yield take(requestAction)
    const response = yield call(apifetch, apiName, params, callback)
    yield put(successActionFun(response.data))
  } catch (error) {
    yield put(createAction('REQUEST_FAILED', 'error')(error.message))
  }
}

/**
 * websocket连接
 * @param {string} apiName 获取数据的api名称
 * @param {object} params 请求参数
 * @param {function} successActionFun 数据成功返回后触发的action的生成器
 */
const apifetchSocket = (apiName, params, successActionFun) => fetchSocket(apiName, params)(successActionFun)

/**
 * 生成websocket请求的saga
 * @param {string} apiName 获取数据的api名称
 * @param {object} params 请求参数
 * @param {string} requestAction 监听请求的action的type值
 * @param {function} successActionFun 数据成功返回后触发的action的生成器
 */
function* wsSaga(apiName, params, requestAction, successActionFun) {
  try {
    yield take(requestAction)
    yield call(apifetchSocket, apiName, params, successActionFun)
  } catch (error) {
    yield put(createAction('REQUEST_FAILED', 'error')(error.message))
  }
}

/**
 * 供组件调用的请求入口
 * @param {object} dispatch dispatch对象
 * @param {string} keyStr 生成action的type值需要的关键字
 */
export default (dispatch, keyStr) =>
  /**
   * 高阶函数第二层
   * @param {string} apiName 获取数据的api名称
   * @param {object} params 请求参数
   * @param {string} reducerName 返回的数据集的名称
   * @param {boolean} isSocket 是否是websocket连接
   */
  (apiName, params, reducerName, isSocket) => {
    const now = new Date()
    const time = now.getTime()
    // action的type字符串，为防止重复，在末尾添加当前时间的毫秒数
    const requestAction = `${keyStr.toString().toUpperCase()}_REQUEST_${time}`
    const successAction = `${keyStr.toString().toUpperCase()}_SUCCESS_${time}`

    // 生成完整的action
    const requestActionFun = createAction(requestAction)
    const successActionFun = createAction(successAction, 'response')

    const reducerNameType = typeof reducerName

    // 添加saga处理流程
    if (apiName) {
      let saga = isSocket ? wsSaga : httpSaga
      const callback = reducerNameType === 'function' ? reducerName : undefined
      saga = saga.bind(null, apiName, params, requestAction, successActionFun, callback)
      store.runSaga(saga)
    }

    // 如果没有传入结果对象的名称，则认为开发者自定义了reducer，不再需要动态注入
    if (reducerName && reducerNameType === 'string') {
      injectAsyncReducer(store, reducerName, createReducer(successAction))
    }
    // 发送action
    dispatch(requestActionFun())
  }
