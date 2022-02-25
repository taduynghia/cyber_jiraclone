import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
  STATUS_CODE,
} from "./../../constants/Cyberbugs/Cyberbugs";
import { takeLatest, call, put, delay, select } from "redux-saga/effects";
import { statusService } from "./../../../services/StatusService";
function* getAllStatusSaga(action) {
  try {
    const { data, status } = yield call(() => statusService.getAllStatus());

    yield put({
      type: GET_ALL_STATUS,
      arrStatus: data.content,
    });
    if (status === STATUS_CODE.SUCCESS) {
      console.log("data status", data);
    }
  } catch (err) {
    console.log(err.response?.data);
  }
}
export function* theoDoiGetAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}
