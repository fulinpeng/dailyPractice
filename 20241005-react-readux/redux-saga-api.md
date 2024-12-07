Redux-Saga 的核心就是**监听 Action**并管理副作用，同时利用 Redux 来存储和更新状态。

### 示例场景
一个简单的任务是：获取用户列表并显示在页面上。当点击刷新按钮时，重新拉取数据。

---

#### 创建 Redux 的 Action 和 Reducer

1. **定义 Action Types**
   ```javascript
   // src/actions/types.js
   export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
   export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
   export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
   ```

2. **创建 Action Creators**
   ```javascript
   // src/actions/userActions.js
   import {
     FETCH_USERS_REQUEST,
     FETCH_USERS_SUCCESS,
     FETCH_USERS_FAILURE,
   } from './types';

   export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
   export const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
   export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });
   ```

3. **定义 Reducer**
   ```javascript
   // src/reducers/userReducer.js
   import {
     FETCH_USERS_REQUEST,
     FETCH_USERS_SUCCESS,
     FETCH_USERS_FAILURE,
   } from '../actions/types';

   const initialState = {
     loading: false,
     users: [],
     error: null,
   };

   const userReducer = (state = initialState, action) => {
     switch (action.type) {
       case FETCH_USERS_REQUEST:
         return { ...state, loading: true };
       case FETCH_USERS_SUCCESS:
         return { ...state, loading: false, users: action.payload };
       case FETCH_USERS_FAILURE:
         return { ...state, loading: false, error: action.payload };
       default:
         return state;
     }
   };

   export default userReducer;
   ```

4. **创建 Root Reducer**
   ```javascript
   // src/reducers/index.js
   import { combineReducers } from 'redux';
   import userReducer from './userReducer';

   const rootReducer = combineReducers({
     user: userReducer,
   });

   export default rootReducer;
   ```

---

### Saga 中间件

1. **创建 Saga**
   ```javascript
   // src/sagas/userSaga.js
   import { call, put, takeEvery } from 'redux-saga/effects';
   import { fetchUsersSuccess, fetchUsersFailure } from '../actions/userActions';
   import { FETCH_USERS_REQUEST } from '../actions/types';

   // 模拟异步请求
   const fetchUsersFromApi = () =>
     fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json());

   function* fetchUsers() {
     try {
       const users = yield call(fetchUsersFromApi);
       yield put(fetchUsersSuccess(users)); // 成功时触发 SUCCESS
     } catch (error) {
       yield put(fetchUsersFailure(error.message)); // 失败时触发 FAILURE
     }
   }

   function* userSaga() {
     yield takeEvery(FETCH_USERS_REQUEST, fetchUsers); // 监听 FETCH_USERS_REQUEST
   }

   export default userSaga;
   ```

2. **根 Saga**
   ```javascript
   // src/sagas/index.js
   import { all } from 'redux-saga/effects';
   import userSaga from './userSaga';

   export default function* rootSaga() {
     yield all([userSaga()]); // 可以监听多个 Saga
   }
   ```

3. **创建并配置 Redux Store**
   ```javascript
   // src/store.js
   import { createStore, applyMiddleware } from 'redux';
   import createSagaMiddleware from 'redux-saga';
   import rootReducer from './reducers';
   import rootSaga from './sagas';

   const sagaMiddleware = createSagaMiddleware();

   const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

   sagaMiddleware.run(rootSaga);

   export default store;
   ```

---

### 第四步：React 组件

1. **根组件**
   ```javascript
   // src/index.js
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { Provider } from 'react-redux';
   import store from './store';
   import App from './App';

   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('root')
   );
   ```

2. **`App` 组件**
   ```javascript
   // src/App.js
   import React from 'react';
   import { useSelector, useDispatch } from 'react-redux';
   import { fetchUsersRequest } from './actions/userActions';

   const App = () => {
     const dispatch = useDispatch();
     const { loading, users, error } = useSelector((state) => state.user);

     const fetchUsers = () => {
       dispatch(fetchUsersRequest());
     };

     return (
       <div>
         <h1>User List</h1>
         <button onClick={fetchUsers}>Fetch Users</button>
         {loading && <p>Loading...</p>}
         {error && <p>Error: {error}</p>}
         <ul>
           {users.map((user) => (
             <li key={user.id}>{user.name}</li>
           ))}
         </ul>
       </div>
     );
   };

   export default App;
   ```
