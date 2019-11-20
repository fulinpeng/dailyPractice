import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

// import {incrementReducer} from '_root/reducers/index';
import * as reducer from '_root/reducers/index';
// import { watchIncrementAsync } from '_root/sagas/index'

// 异步redux
const sagaMiddleware = createSagaMiddleware();

// createStore有三个参数哦
// const store = createStore(incrementReducer, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(watchIncrementAsync);
// combineReducers返回的是一个函数
const store = createStore(combineReducers(reducer));
// 生成的store实例，会提供几个方法，同时有个疑惑：
// 那些initialState哪儿去了，既然被combineReducers封装了一次，那怎么找的到呢？
// 调用store.getState()方法会发现：根state里面已经有了那几个初始化的对象在了😀，人家啥做好了
console.log('@@@@@@@@@@@@store', store.getState());
export default store;
