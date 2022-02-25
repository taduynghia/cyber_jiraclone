import { applyMiddleware, combineReducers, createStore } from "redux";
//middleware saga
import createMiddlewareSaga from "redux-saga";
//import CyberBugReducer from "./reducers/CyberBugReducer";
import { rootSaga } from "./sagas/rootSaga";
import LoadingReducer from "./reducers/LoadingReducer";
import { HistoryReducer } from "./reducers/HistoryReducer";
import { UserLoginCyberBugsReducer } from "./reducers/UserCyberBugsReducer.js";
import { ProjectCategoryReducer } from "./reducers/ProjectCategoryReducer";
import { GetProjectCyberBugsReducer } from "./reducers/GetProjectCyberBugsReducer";
import { DrawerCyberbugsReducer } from "./reducers/DrawerCyberbugsReducer";
import { EditProjectReducer } from "./reducers/EditProjectReducer";
import { TaskTypeReducer } from "./reducers/TaskTypeReducer";
import { PriorityReducer } from "./reducers/PriorityReducer";
import { StatusReducer } from "./reducers/StatusReducer";
import { TaskDetailReducer } from "./reducers/TaskDetailReducer";
const middlewareSaga = createMiddlewareSaga();
const rootReducer = combineReducers({
  //reducer khai báo tại đây

  LoadingReducer,
  HistoryReducer,
  UserLoginCyberBugsReducer,
  ProjectCategoryReducer,
  GetProjectCyberBugsReducer,
  DrawerCyberbugsReducer,
  EditProjectReducer,
  TaskTypeReducer,
  PriorityReducer,
  StatusReducer,
  TaskDetailReducer,
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));
//gọi root saga
middlewareSaga.run(rootSaga);
export default store;
