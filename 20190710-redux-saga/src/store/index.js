import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducer from '_root/reducers/index';
import rootSaga from '_root/sagas/index';
import makeReducer from '../util/makeReducer';

console.log('rootSaga', rootSaga);

// 异步redux
const sagaMiddleware = createSagaMiddleware();

// preloadedState ，它是state的初始值
const preloadedState = {
    // name: 'flp', // 会报错，Unexpected keys will be ignored
    increment: {number: 11},
    reduce: {number: 111}
};
const store = createStore(makeReducer(reducer), preloadedState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

// combineReducers返回的是一个函数
// const store = createStore(combineReducers(reducer)); // 不用saga就用这个

console.log('*************-store', store, store.getState());
export default store;


// 生成的store实例，会提供几个方法，同时有个疑惑：
// 那些initialState哪儿去了，既然被combineReducers封装了一次，那怎么找的到呢？
// 调用store.getState()方法会发现：根state里面已经有了那几个初始化的对象在了😀，人家啥都做好了
