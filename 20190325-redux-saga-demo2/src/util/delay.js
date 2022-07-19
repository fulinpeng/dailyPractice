/**
 *  生成一个延迟函数
 *  @param    {Function}  func        需要延迟执行的函数
 *  @param    {number}  delayMillis 延迟执行的毫秒数
 *  @return   {Function}  延迟函数
 */
export function delay(func, delayMillis) {
  /**
   * 延迟函数
   * @param    {boolean=}  immediate 是否立即执行（可选，默认为false）
   * @return {function} 延时函数
   */
  return function delayFunc(immediate) {
    if(immediate === true) {
      func()
    } else {
      setTimeout(func, delayMillis)
    }
  }
}