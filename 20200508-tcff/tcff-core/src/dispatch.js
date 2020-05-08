import { getApp } from './app'

const globalApp = getApp()

export function dispatch (...args) {
  const coreDispatch = (globalApp && globalApp.store && globalApp.store.dispatch) || function () { }
  // if (coreDispatch == null) {
  //   throw new Error('applicaiton or store has not to be initialized')
  // }
  return coreDispatch(...args)
}

export function promiseDispatch (action) {
  return new Promise((resolve, reject) => {
    action = { ...action }
    action.meta = {
      ...action.meta,
      resolve,
      reject
    }
    return dispatch(action)
  })
}
