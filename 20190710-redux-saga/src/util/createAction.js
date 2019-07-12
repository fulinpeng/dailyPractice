/**
 * @param {string} type action类型，必选字段
 * @param {object} args 请求参数：
 *  如果type为发起请求类型，则参数列表为请求参数；
 *  如果type为响应成功类型，则参数为响应结果数据；
 *  如果type为失败类型，则参数为错误信息。
 * @return {object} action对象
 */
export default (type, ...argNames) => (...args) => {
  let action = { type }
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index]
  })
  return action
}
