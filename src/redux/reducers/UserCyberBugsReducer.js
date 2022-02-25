import { USER_LOGIN } from "../../ultil/constants/settingSystem";
import { USLOGIN, GET_USER_SEARCH } from "../constants/Cyberbugs/Cyberbugs";
import { GET_USER_BY_PROJECT_ID } from "./../constants/Cyberbugs/Cyberbugs";

let userInfoLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  userInfoLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
  userLogin: userInfoLogin,
  userSearch: [],
  arrUser: [], //array user cho thẻ select create task, khi load ra dự án, thẻ option chỉ hiện
  //đúng số lượng tên thành viên có trong dự án mà thôi
};

export const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    case GET_USER_SEARCH: {
      state.userSearch = action.lstUserSearch;

      return { ...state };
    }
    case GET_USER_BY_PROJECT_ID: {
      return { ...state, arrUser: action.arrUser };
    }
    default:
      return { ...state };
  }
};
