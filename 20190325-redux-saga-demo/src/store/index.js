import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import {increment} from '_root/reducers/index';
// import {increment} from '_root/reducers/incrementReducer';
import * as reducer from '_root/reducers/index';
import rootSaga from '_root/sagas/index'

// 异步redux
const sagaMiddleware = createSagaMiddleware();

const store = createStore(increment, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
