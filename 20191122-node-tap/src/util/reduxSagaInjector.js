
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
    yield take(requestAction) // 触发了这个saga才会执行下面的，这个saga就是为了下面的apifetch啊
    // 😍备注：好像take只是为了后面代码发了action，之后代码执行栈会调到这里来，为的就是下面那个yield啊
    // response 为请求结果，失败的结果也在
    const response = yield call(apifetch, apiName, params, callback)
    console.log(`${apiName}-response`, response);
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
    // 监听这个saga，然后代码执行栈会进入这里，并调用 apifetchSocket
    yield take(requestAction)
    yield call(apifetchSocket, apiName, params, successActionFun)
  } catch (error) {
    yield put(createAction('REQUEST_FAILED', 'error')(error.message))
  }
}

/**
 * 供组件调用的请求入口
 * @param {string} keyStr 生成action的type值需要的关键字
 */
export default (keyStr) =>
  /**
   * 高阶函数第二层
   * @param {string} apiName 获取数据的api名称
   * @param {object} params 请求参数
   * @param {string} reducerName 处理返回的数据的reducer名称
   * @param {boolean} isSocket 是否是websocket连接
   */
  (apiName, params, reducerName, isSocket) => {
    const now = new Date()
    const time = now.getTime()
    // action的type字符串，为防止重复，在末尾添加当前时间的毫秒数
    // 为什么这个action这样子就行啊，一个字符串？？？，你懂吗，去看看 20190710-redux-saga 的readme
    const requestAction = `${keyStr.toString().toUpperCase()}_REQUEST_${time}`
    const successAction = `${keyStr.toString().toUpperCase()}_SUCCESS_${time}`

    // 生成saga的中转action
    let requestActionFun = createAction(requestAction)
    let successActionFun = createAction(successAction, 'response')

    const reducerNameType = typeof reducerName

    // 添加saga处理流程
    if (apiName) {
      let saga = isSocket ? wsSaga : httpSaga
      if (reducerNameType === 'function') {
        const callback = reducerName || undefined
        // 咋用 bind ？因为saga必须是一个 async 函数啊，bind 返回的时函数
        saga = saga.bind(null, apiName, params, requestAction, successActionFun, callback)
      }
      
      // 如果传入自定义reducer名，而不是函数，需要动态注入
      // 假如有的请求需要把结果保存到 store 中，怎么办
      if (reducerName && reducerNameType === 'string') {
        // 负责发请求的saga的action和处理数据的action可以用自己生成的
        // 这两个action都是中间action，这两个action是一定会自动生成的
        // 与上面的区别是：这里没有加时间戳，其实都不用加的，以后用全局变量来维护 ...
        requestActionFun = createAction(reducerName.toString().toUpperCase())
        successActionFun = createAction(reducerName.toString().toUpperCase(), 'response')
        // 没有负责处理数据的 reducer ，就自动生成
        // 这个判断很明显是一个坑，这种怎么处理喃
        if (!store.asyncReducers[reducerName]) {
          injectAsyncReducer(store, reducerName, createReducer(reducerName))
        } else {

        }
        saga = saga.bind(null, apiName, params, requestActionFun, successActionFun) // 不传 callback
      }
      store.runSaga(saga)
    }

    // 发送action
    // 如: testApisTest3 testApisTest2 testApisTest1 ...
    store.dispatch(requestActionFun())
  }

  // REQUEST_FAILED 这个reducer怎么定义，才能用
  // 假如有的请求需要把结果保存到 store 中