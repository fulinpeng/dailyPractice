import { put, takeEvery, all, delay } from "redux-saga/effects";
import { subductionReducer } from "_root/reducers/subductionReducer";

export function* subductionAsync() {
  yield delay(1000);
  yield put({ type: 'SUBDUCTION' });
}

export function* watchSubductionAsync() {
  yield takeEvery('INCREMENT_ASYNC', subductionAsync);
}

export default function* rootSaga() {
  yield all([
    watchSubductionAsync()
  ])
}