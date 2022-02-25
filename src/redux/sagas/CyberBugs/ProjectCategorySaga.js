import { takeLatest, call, put } from "redux-saga/effects";
import { cyberBugService } from "../../../services/CyberbugsService";
import {
  GET_ALL_PROJECT_CATEGORY_SAGA,
  GET_ALL_PROJECT_CATEGOTY,
  STATUS_CODE,
} from "../../constants/Cyberbugs/Cyberbugs";
function* getAllProjectCategorySaga(action) {
  //gọi action lấy api
  try {
    //gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberBugService.getAllProjectCategory()
    );
    //gọi api thành công thì dispatch lên reducer thông qua put

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGOTY,
        data: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}
