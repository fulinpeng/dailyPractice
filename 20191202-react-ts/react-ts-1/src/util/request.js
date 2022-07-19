
import axios from 'axios'
import {put, call, take, actionChannel} from 'redux-saga/effects';
import {takeEvery, eventChannel} from 'redux-saga';
import ReconnectingWebSocket from 'reconnecting-websocket'
import isFunction from 'lodash/isFunction'
import isNumber from 'lodash/isNumber'
import isArray from 'lodash/isArray'
import { delay } from './delay'

import config from '../config/config'
import apis from './apiloader'

// axios.defaults.headers.post['Content-Type'] = 'application/json';
const { mock } = config

// 模拟数据时需要存储fetchInterval的结果作为ws对象
let mockWs = null

axios.defaults.baseURL = mock ? config.host : config.proxyHost
axios.defaults.withCredentials = false

// Add a response interceptor
axios.interceptors.response.use(function(response) {
  // Do something with response data
  if(response.status === 401) {
    window.location.pathname = '/'
  }
  return response
}, function(error) {
  // Do something with response error
  return Promise.reject(error)
})

/**
 * 普通AJAX请求
 *  如果向后端传递的数据需要是json，那么接口.config.contentType应为'application/json; charset=UTF-8'
 *  如果向后端传递的数据需要传递文件，那么接口.config.contentType应为'multipart/form-data; charset=UTF-8'
 *
 * @export 对外暴露方法
 * @param {string} apiName 接口名称
 * @param {object} [data={}] 接口参数 可选
 * @param {function} callback 回调函数
 * @returns {Boolean} false
 */
export function fetch(apiName, data = {}, callback) {
  if(arguments.length === 2 && isFunction(data)) {
    // 只传了apiName和callback
    callback = data
    data = {}
  }
  const ajaxConfig = apis.config(apiName)
  const extraAjaxConfig = {}
  let ajaxData = apis.filterData(apiName, data)
  if(ajaxConfig.contentType) {
    const contentType = ajaxConfig.contentType
    if(contentType.indexOf('application/json') !== -1) {
      // application/json的要自己将传递的数据转换成字符串
      ajaxData = JSON.stringify(ajaxData)
    } else if(contentType.indexOf('multipart/form-data') !== -1) {
      // 有文件要上传，使用formData
      // 把contentType置为false，由xhr自己生成，避免使用者忘记设置boundary
      extraAjaxConfig.contentType = false
      // xhr可直接发送formData，不用jquery重复处理数据
      extraAjaxConfig.processData = false
      const formData = new FormData()
      Object.keys(ajaxData)
        .forEach(key => {
          const val = ajaxData[key]
          if(isArray(val)) {
            val.forEach(v => {
              formData.append(key, v)
            })
          } else {
            formData.append(key, val)
          }
        })
      extraAjaxConfig.data = formData
    }
  }
  return axios({
    url: apis.url(apiName, data),
    responseType: 'json',
    method: ajaxConfig.method || 'get',
    data: ajaxData,
    ...ajaxConfig,
    ...extraAjaxConfig
  })
}

/**
 *  向指定api循环发送发送请求
 *  @param    {string}   apiName api名称
 *  @param    {object=}   data    请求参数（可选）
 *  @param    {Function}    cb    处理响应数据的回调
 *  @param    {number=}    interval    轮询间隔（毫秒）（可选，默认为配置值）
 *  @return   {Object}   用于对轮询状态进行操作的实例
 */
export function fetchInterval(apiName, data, cb, emit, interval) {
  const argumentsLength = arguments.length
  const defaultInterval = config.get('fetchInterval')
  if(argumentsLength === 2) {
    // 只传了2个参数
    // 没传data，没传interval
    cb = data
    data = null
    interval = null
  } else if(argumentsLength === 3) {
    // 只传了3个参数
    if(isFunction(cb)) {
      // 没有传interval
      interval = null
    } else if(isNumber(cb)) {
      // 没有传data
      interval = cb
      cb = data
      data = null
    }
  }

  data = data || {}
  interval = interval || defaultInterval

  let hasClosed = false
  const delayFetchInterval = delay(
    function() {
      if(hasClosed) {
        return
      }
      fetch(apiName, data, cb).then(res => {
        res.ws = mockWs
        emit(res)
        delayFetchInterval()
      })
      // fetch(apiName, data, cb)
      //   .always(delayFetchInterval)
    },
    interval
  )
  delayFetchInterval(true)
  return {
    // 停止轮询
    close() {
      hasClosed = true
    }
  }
}

/**
 *  创建channel对象
 *  @param    {string}   apiName api名称
 *  @param    {Object=}   data    请求参数（可选）
 *  @param    {Function} cb      处理推送数据的回调
 *  @return   {Function}   websocket连接断开时需要执行的函数
 */
function* createEventChannel(apiName, data, cb) {
  return eventChannel(emit => {
    if(config.get('mock')){
      mockWs = fetchInterval(apiName, data, cb, emit)
    }else{
      const ws = new ReconnectingWebSocket(
        apis.url(apiName, data), []
      )
      ws.onmessage= (message) => emit({data: JSON.parse(message.data), ws})
    }
    return () => {
      console.log('will be closed...')
    }
  });
}
/**
 *  实例化Channel对象，并监听回调函数，根据回调分发action
 *  @param    {string}   apiName api名称
 *  @param    {Object=}   data    请求参数（可选）
 *  @param    {Function} cb      处理推送数据的回调
 *  @return   {void}
 */
export function fetchSocket(apiName, data, cb){
  return function* (createAction) {
    const channel = yield call(createEventChannel, apiName, data, cb);
    while(true){
      const res = yield take(channel);
      res.data.result.ws = res.ws
      yield put(createAction(res.data.result))
    }
  }
}
