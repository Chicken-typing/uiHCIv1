import { FETCH_API_ORDER } from "../ActionType";
import { fetchOrdersSuccess, fetchAPIFailure } from "../action";
import { call, takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import { API_ORDER } from "../linkTo";
import store from "../store";
function* fetchPost() {
  const state = store.getState();
  const user = state?.User?.userInfor;
  const header = {
    Authorization: `Bearer ${user.token}`,
  };
  try {
    const res = (yield call(axios.get, API_ORDER, { headers: header })).data;
    yield put(fetchOrdersSuccess(res));
  } catch (e) {
    yield put(fetchAPIFailure(e.message));
  }
}
function* fetchOrderSaga() {
  yield takeLatest(FETCH_API_ORDER, fetchPost);
}
export default fetchOrderSaga;
