import { increment } from './increment';
import { reduce } from './reduce';

// combineReducers 会创建两个子对象放到根state里面
export {
    increment,
    reduce
};

import { combineReducers } from 'redux'

/**
 * 主reducers方法，合并各个子reducer
 * @param {object} asyncReducers
 */
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    ...asyncReducers
  })
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
}

