import { fetchAPIFailure } from "../action"
import { fetchAdvertiseSuccess } from '../action/fetchAdvertises'
import { call, takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import { FETCH_API_ADVERTISE } from "../ActionType";
import { API_ADVERTISE } from "../linkTo";

function* fetchPost() {
    try {
        const res = (yield call(axios.get, API_ADVERTISE)).data;
        yield put(fetchAdvertiseSuccess(res));
    } catch (e) {
        yield put(fetchAPIFailure(e.message));
    }
}

function* fetchAdvertiseSaga() {
    yield takeLatest(FETCH_API_ADVERTISE, fetchPost);
}
export default fetchAdvertiseSaga;