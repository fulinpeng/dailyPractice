// https://blog.csdn.net/liwusen/article/details/79677827

// thunk 处理的是 action 不是 reducer

function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
      }
  
      return next(action);
    };
  }
  
  const thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  
  export default thunk;



  
// let next = store.dispatch;
// store.dispatch = function dispatchAndLog(action) {
//     console.log(action.type + ':', action.newData);
//     next(action);
//     console.log('next state', store.getState());
// }