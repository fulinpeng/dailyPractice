/*
 * @Description: Loading
  */

import React from 'react'

// 这是一个组件
const LoadingComponent = (props) => {
  if(props.error) {
    // 组件加载错误
    return <div>Error!</div>
  } else if(props.timedOut) {
    // 组件加载超时
    return <div>Taking a long time...</div>
  } else if(props.pastDelay) {
    // 组件加载超过设置的延迟时间
    return <div>Loading...</div>
  } else {
    return null
  }
}

export default LoadingComponent
