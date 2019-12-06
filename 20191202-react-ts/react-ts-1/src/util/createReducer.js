/**
 * 根据传入的action类型生成reducers
 * @param {string} type action类型
 */
export default (type) => {
  return (state = {}, action) => {
    if(type === action.type) {
      return Object.assign({}, state, {
        ...action.response
      })
    }
    return state
  }
}
