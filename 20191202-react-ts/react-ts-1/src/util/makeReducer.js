
import { combineReducers } from 'redux'

/**
 * 主reducers方法，合并各个子reducer
 * @param {object} asyncReducers
 */
export const makeReducer = (asyncReducers) => {
  return combineReducers({
    ...asyncReducers
  })
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(makeReducer(store.asyncReducers));
}

export default makeReducer
