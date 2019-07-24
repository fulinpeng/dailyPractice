import { createStore, combineReducers, applyMiddleware,  } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducer from '_root/reducers';
import makeReducer from '../util/makeReducer';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(
    makeReducer({
        ...reducer
    }),
    applyMiddleware(...middleware)
);
store.asyncReducers = {}
store.asyncSagas = {}
store.runSaga = (saga) => {
  sagaMiddleware.run(saga)
}
console.log('store:', store);
console.log('sssssssssssssssssssssssssssssssssss');
console.log('sssssssssssssssssssssssssssssssssss');
console.log('sssssssssssssssssssssssssssssssssss');
console.log('sssssssssssssssssssssssssssssssssss');
console.log('sssssssssssssssssssssssssssssssssss');
var bb = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
console.log('bb:', bb);
export default store;
