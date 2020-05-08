var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { getApp } from './app';

var globalApp = getApp();

export function dispatch() {
  var coreDispatch = globalApp && globalApp.store && globalApp.store.dispatch || function () {};
  // if (coreDispatch == null) {
  //   throw new Error('applicaiton or store has not to be initialized')
  // }
  return coreDispatch.apply(undefined, arguments);
}

export function promiseDispatch(action) {
  return new Promise(function (resolve, reject) {
    action = _extends({}, action);
    action.meta = _extends({}, action.meta, {
      resolve: resolve,
      reject: reject
    });
    return dispatch(action);
  });
}