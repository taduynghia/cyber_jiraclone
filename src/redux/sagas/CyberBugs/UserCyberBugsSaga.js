import {
  call,
  delay,
  fork,
  take,
  takeEvery,
  takeLatest,
  put,
  select,
} from "redux-saga/effects";
import { cyberBugService } from "../../../services/CyberbugsService";
import {
  TOKEN,
  USER_LOGIN,
  GET_USER_API,
  ADD_USER_PROJECT_API,
  REMOVE_USER_PROJECT_API,
} from "../../../ultil/constants/settingSystem";
//import { history } from "../../../ultil/libs/history";
import {
  STATUS_CODE,
  USER_SIGNIN_API,
  USLOGIN,
  GET_USER_SEARCH,
  GET_LIST_PROJECT_SAGA,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
} from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { userService } from "../../../services/UserService";
//quản lý các action saga: nhận vào các action là fucntion như trong redux thunk
function* signinSaga(action) {
  // console.log("history", history);

  yield put({ type: DISPLAY_LOADING });
  yield delay(300);
  //gọi api
  try {
    // const { data, status } = yield cyberBugService.signinCyberBugs(
    //   action.userLogin
    // );

    const { data, status } = yield call(() =>
      cyberBugService.signinCyberBugs(action.userLogin)
    );
    //lưu access token
    localStorage.setItem(TOKEN, data.content.accessToken);
    //biến đổi object thành chuỗi
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    console.log(data);
    //lưu thông lấy từ server lên reducer
    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    //lưu vào localStorage khi đăng nhập thành công
    //history.push("/home");
    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/home");
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

//export 1 generator fucntion để lắng nghe người dùng dispatch
//lắng nghe ở lần gần nhất để tránh việ người dùng nhấn nhiều lần
export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

/////////
function* getUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );

    console.log("data", data);
    yield put({
      type: GET_USER_SEARCH,
      lstUserSearch: data.content,
    });
    console.log(data);
    //lưu thông lấy từ server lên reducer

    //lưu vào localStorage khi đăng nhập thành công
    //history.push("/home");
    // let history = yield select((state) => state.HistoryReducer.history);
    // history.push("/home");
  } catch (err) {
    console.log(err.response.data);
  }
}
export function* theoDoiGetUser() {
  yield takeLatest(GET_USER_API, getUserSaga);
}

//add user projectsaga

function* addUserProjectSaga(action) {
  //gọi api
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );
    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiAddUserProject() {
  yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga);
}

//delete user from project

function* removeUserProjectSaga(action) {
  //gọi api
  try {
    const { data, status } = yield call(() =>
      userService.removeUserProject(action.userProject)
    );
    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiRemoveUserProject() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectSaga);
}

//get user by project idProject

function* getUserByProjectIdSaga(action) {
  const { idProject } = action;
  console.log(idProject);

  try {
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );
    console.log("checkdata", data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content,
      });
    }
    console.log(data);
  } catch (err) {
    console.log(err.response?.data);
    if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: [],
      });
    }
  }
}
export function* theoDoiGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}
