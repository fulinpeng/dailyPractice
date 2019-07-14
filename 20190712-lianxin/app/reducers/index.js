/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import createReducer from '@/util/createReducer'

/**
 * 主reducers方法，合并各个子reducer
 * @param {object} asyncReducers
 */
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    routing: routerReducer,
    ...asyncReducers
  })
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
}

export default makeRootReducer

