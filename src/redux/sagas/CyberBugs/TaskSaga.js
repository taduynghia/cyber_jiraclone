import { takeLatest, call, put, delay, select } from "redux-saga/effects";

import { taskService } from "../../../services/TaskService";
import {
  CLOSE_DRAWER,
  CREATE_TASK_SAGA,
  STATUS_CODE,
  GET_TASK_DEATAIL_SAGA,
  GET_TASK_DEATAIL,
  UPDATE_TASK_STATUS_SAGA,
  UPDATE_TASK_STATUS,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  UPDATE_TASK_SAGA,
  CHANGE_TASK_MODAL,
  CHANGE_ASSIGNESS,
  REMOVE_USER_ASSIGN,
} from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { notifiFunction } from "../../../ultil/Notification/notificationCyberbugs";
import { HANDLE_CHANGE_POST_API_SAGA } from "./../../constants/Cyberbugs/Cyberbugs";
import { TaskDetailReducer } from "./../../reducers/TaskDetailReducer";
function* createTaskSaga(action) {
  console.log("action create task", action);
  //gọi action lấy api
  try {
    //Hiển thị LOADING
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(500);
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      notifiFunction("success", "Create task is successfully !");
    } else {
      notifiFunction("error", "Create task fail !");
    }
    yield put({
      type: CLOSE_DRAWER,
    });
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

//get task detail saga

function* getTaskDetailSaga(action) {
  const { taskId } = action;
  console.log("taskId", taskId);
  try {
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(taskId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DEATAIL,
        taskDetailModal: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DEATAIL_SAGA, getTaskDetailSaga);
}

//update taask saga
function* updateTaskStatusSaga(action) {
  const { taskUpdateStatus } = action;
  try {
    //cập nhật api status cho task hiện tại (task đang mở modal)
    const { data, status } = yield call(() =>
      taskService.updateStatusTask(taskUpdateStatus)
    );
    //sau khi thành công goi lại getProjectDetail saga để sắp xếp lại thông tin task
    //console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskUpdateStatus.projectId,
      });
      yield put({
        type: GET_TASK_DEATAIL_SAGA,
        taskId: taskUpdateStatus.taskId,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}
export function* theoDoiUpdateTaskSaga() {
  yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatusSaga);
}

function* handleChangePostApi(action) {
  //gọi action làm thay đổi task detail model
  switch (action.actionType) {
    case CHANGE_TASK_MODAL: {
      const { value, name } = action;
      yield put({
        type: CHANGE_TASK_MODAL,
        name,
        value,
      });
      break;
    }
    case CHANGE_ASSIGNESS: {
      const { userSelected } = action;
      yield put({
        type: CHANGE_ASSIGNESS,
        userSelected,
      });
      break;
    }
    case REMOVE_USER_ASSIGN: {
      const { userId } = action;
      yield put({
        type: REMOVE_USER_ASSIGN,
        userId,
      });
      break;
    }
  }
  //save qua api updateTaskSaga
  //lấy dữ liệu từ state.taskDetailModal
  let { taskDetailModal } = yield select((state) => state.TaskDetailReducer);
  console.log("taskDetailModal sau khi thay đổi", taskDetailModal);
  //biến đổi state.taskDetailModal thành dữ liệu cần
  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });
  const taskUpdateApi = { ...taskDetailModal, listUserAsign };
  try {
    const { data, status } = yield call(() =>
      taskService.updateTask(taskUpdateApi)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskUpdateApi.projectId,
      });
      yield put({
        type: GET_TASK_DEATAIL_SAGA,
        taskId: taskUpdateApi.taskId,
      });
    }
  } catch (err) {
    console.log(err.response?.data);
    console.log(err);
  }
}

export function* theoDoiHandleChangePostApiSaga() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}
