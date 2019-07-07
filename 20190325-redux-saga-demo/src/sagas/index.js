import { put, takeEvery, all } from "redux-saga/effects";
import { SUBDUCTION,INCREMENT2, SUBDUCTION_ASYNC } from '_root/const/index';
import { delay } from "redux-saga";
import { subductionReducer } from "_root/reducers/subductionReducer";

export function* subductionAsync() {
  yield delay(2000);
  yield put({ type: INCREMENT2 });
}

export function* watchSubductionAsync() {
  yield takeEvery('INCREMENT2_ASYNC', subductionAsync);
}

export default function* rootSaga() {
  yield all([
    watchSubductionAsync()
  ])
}