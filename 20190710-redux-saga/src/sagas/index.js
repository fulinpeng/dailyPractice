import { delay, put, takeEvery, take } from "redux-saga/effects";


// const delay = ms => new Promise((resolve) => {
//   setTimeout(() => {
//     resolve()
//   }, ms)
// })

function* incrementAsync() {
  yield delay(2000);
  yield put({ type: 'REDUCE' });
}

function * watchIncrement(){
  // 没有 while(true) 就只监听一次😂
  while(true){
    const action= yield take('INCREMENT1_SAGA');
    yield delay(2000);
    console.log('~~~~~~~~~~~~~~---watchIncrement', action);
    yield put({type:'INCREMENT'});
  }
}

export default function* rootSaga() {
  // 这里演示了两种方式：1. takeEvery 2. take ，都可以监听
  yield takeEvery('INCREMENT_SAGA', incrementAsync); // takeEvery，用于监听每一次 INCREMENT_SAGA action，并在 action 被匹配时执行
  yield watchIncrement();
}