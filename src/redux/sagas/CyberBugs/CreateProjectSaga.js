import { takeLatest, call, put, delay, select } from "redux-saga/effects";
import { cyberBugService } from "../../../services/CyberbugsService";
import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../ultil/Notification/notificationCyberbugs";
import {
  CREATE_PROJECT_SAGA,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
  STATUS_CODE,
  UPDATE_CONTENT_PROJECT_SAGA,
  CLOSE_DRAWER,
  DELETE_PROJECT_SAGA,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
  GET_USER_BY_PROJECT_ID_SAGA,
} from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
//import { history } from "../../../ultil/libs/history";
function* createProjectSaga(action) {
  //Hiển thị LOADING
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  //gọi action lấy api
  try {
    //gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberBugService.createProjectAuthorizarion(action.newProject)
    );
    //gọi api thành công thì dispatch lên reducer thông qua put

    if (status === STATUS_CODE.SUCCESS) {
      let history = yield select((state) => state.HistoryReducer.history);
      history.push("/projectmanagement");
      console.log("create project", data);
    }
  } catch (err) {
    console.log(err);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoicreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

function* getListProjectSaga(action) {
  //gọi action lấy api
  try {
    //gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberBugService.getAllProjecAuthorization()
    );
    //gọi api thành công thì dispatch lên reducer thông qua put

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_PROJECT,
        projectList: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiGetListProjectSaga() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}

//UpdateContentProjectSaga

function* updateContentProjectSaga(action) {
  //Hiển thị LOADING
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  //gọi action lấy api
  try {
    //gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberBugService.updateContentProject(action.projectUpdate)
    );

    if (status === STATUS_CODE.SUCCESS) {
    }
    //load lại giao diện get list project
    yield call(getListProjectSaga);
    //gọi thành công api tắt drawer
    yield put({
      type: CLOSE_DRAWER,
    });
    // //gọi để load lại get list project saga
    // yield put({
    //   type: GET_LIST_PROJECT_SAGA,
    // });
  } catch (err) {
    console.log(err);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiUpdateContentProjectSaga() {
  yield takeLatest(UPDATE_CONTENT_PROJECT_SAGA, updateContentProjectSaga);
}

//DeleteProjectSaga

function* deleteProjectSaga(action) {
  //Hiển thị LOADING
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  //gọi action lấy api
  try {
    //gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.idProject)
    );
    //gọi api thành công thì dispatch lên reducer thông qua put

    if (status === STATUS_CODE.SUCCESS) {
      console.log("project update", data);
      notifiFunction("success", "Delete project is successfully !");
    } else {
      notifiFunction("error", "Delete project is fail !");
    }
    //load lại giao diện get list project
    yield call(getListProjectSaga);
    //gọi thành công api tắt drawer
    yield put({
      type: CLOSE_DRAWER,
    });
    // //gọi để load lại get list project saga
    // yield put({
    //   type: GET_LIST_PROJECT_SAGA,
    // });
  } catch (err) {
    notifiFunction("error", "Delete project is fail !");
    console.log(err);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

//get project detail

function* getProjectDetail(action) {
  //Hiển thị LOADING
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  //gọi action lấy api
  try {
    //gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      projectService.getProjectDetail(action.projectId)
    );
    //lấy dữ liệu thành công thì gửi dữ liệu lên redux
    yield put({
      type: GET_PROJECT_DETAIL,
      projectDetail: data.content,
    });
  } catch (err) {
    console.log(err);
    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/projectmanagement");
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetail);
}

// get all project

function* getAllProjectSaga() {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  //gọi action lấy api
  try {
    //gọi api lấy dữ liệu về
    const { data, status } = yield call(() => projectService.getAllProject());
    //lấy dữ liệu thành công thì gửi dữ liệu lên redux
    yield put({
      type: GET_ALL_PROJECT,
      arrProject: data.content,
    });
    //dispatch dự án đầu tiên cho create task để task mặc định là dự án đầu tiên
    yield put({
      type: GET_USER_BY_PROJECT_ID_SAGA,
      idProject: data.content[0].id,
    });
  } catch (err) {
    console.log(err);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}
