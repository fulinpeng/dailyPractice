import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import {incrementReducer} from '_root/reducers/index';
import { watchIncrementAsync } from '_root/sagas/index'

// 异步redux
const sagaMiddleware = createSagaMiddleware();

const store = createStore(incrementReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchIncrementAsync);

export default store;
