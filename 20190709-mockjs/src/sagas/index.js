import { delay, put, takeEvery } from "redux-saga/effects";
import { INCREMENT, INCREMENT_ASYNC, REDUCE} from '_root/const/index';

// const delay = ms => new Promise((resolve) => {
//   setTimeout(() => {
//     resolve()
//   }, ms)
// })

function* incrementAsync() {
  yield delay(2000);
  yield put({ type: REDUCE });
}
function* increment() {
  yield delay(2000);
  yield put({ type: INCREMENT });
}

export default function* rootSaga() {     // 在store.js中，执行了 sagaMiddleware.run(rootSaga)
  yield takeEvery(INCREMENT_ASYNC, incrementAsync); // takeEvery，用于监听所有的 INCREMENT_ASYNC action，并在 action 被匹配时执行
  yield takeEvery('INCREMENT1_ASYNC', increment);
}