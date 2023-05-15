import { call, takeEvery, put, takeLatest } from "redux-saga/effects";
import { fetchUserSuccess, fetchAPIFailure } from "../action";
import { FETCH_USER } from "../ActionType";
import axios from "axios";
import { API_USER } from "../linkTo";
import store from "../store";

function* fetchPost() {
  const state = store.getState();
  const user = state?.User?.userInfor;
  const header = {
    Authorization: `Bearer ${user.token}`,
  };
  try {
    const res = yield call(axios.get, API_USER, { headers: header });
    yield put(fetchUserSuccess(res.data));
  } catch (e) {
    yield put(fetchAPIFailure(e.message));
  }
}
function* fetchUserSaga() {
  yield takeLatest(FETCH_USER, fetchPost);
}

export default fetchUserSaga;
