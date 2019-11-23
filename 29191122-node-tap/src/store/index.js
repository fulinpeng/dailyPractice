import { createStore, combineReducers, applyMiddleware, } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducer from '_root/reducers';
import makeReducer from '../util/makeReducer';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const defaultState = {
  increment: {
    number: 11
  }
};

const store = createStore(
  makeReducer({
    ...reducer
  }),
  defaultState,
  applyMiddleware(...middleware)
);
store.asyncReducers = {...reducer}
store.asyncSagas = {}
store.runSaga = (saga) => {
  sagaMiddleware.run(saga)
}

// 因为一有文件更改就直接刷新了，柑橘根本不需要下面这个啊
// if (module.hot) {
//   module.hot.accept('_root/reducers', () => {
//     const reducersHot = require('_root/reducers').default
//     console.log('***********************-module.hot', reducersHot);
//     store.replaceReducer(reducersHot(store.asyncReducers))
//   })
// }

export default store;
