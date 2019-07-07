import { put, takeEvery } from "redux-saga/effects";
import { INCREMENT, INCREMENT_ASYNC } from '_root/const/index';

const delay = ms => new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, ms)
})

export function* incrementAsync() {
  yield delay(2000);
  yield put({ type: INCREMENT });
}

export function* watchIncrementAsync() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsync);
}
