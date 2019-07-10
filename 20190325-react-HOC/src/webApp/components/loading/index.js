/*
 * @Description: Loading
  */

import React from 'react'

const Loading = (props) => {
  if(props.error) {
    // 加载错误
    return <div>Error!</div>
  } else if(props.timedOut) {
    // 超时
    return <div>Taking a long time...</div>
  } else if(props.pastDelay) {
    // 超过延迟时间
    return <div>Loading...</div>
  } else {
    return null
  }
}

export default Loading
