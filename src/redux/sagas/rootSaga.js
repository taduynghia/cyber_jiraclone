import { all } from "redux-saga/effects";
import * as Cyberbugs from "./CyberBugs/UserCyberBugsSaga";
import * as ProjectCategorySaga from "./CyberBugs/ProjectCategorySaga";
import * as CreateProjectSaga from "./CyberBugs/CreateProjectSaga";
import * as TaskTypeSaga from "./CyberBugs/TaskTypeSaga";
import * as PrioritySaga from "./CyberBugs/PriorityProjectSaga";
import * as TaskSaga from "./CyberBugs/TaskSaga";
import * as StatusSaga from "./CyberBugs/StatusSaga";
export function* rootSaga() {
  yield all([
    //nghiệp vụ theo dõi các action saga trong dự án CyberBugs
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiRemoveUserProject(),
    Cyberbugs.theoDoiGetUserByProjectIdSaga(),
    ProjectCategorySaga.theoDoiAllProjectCategory(),
    CreateProjectSaga.theoDoicreateProjectSaga(),
    CreateProjectSaga.theoDoiGetListProjectSaga(),
    CreateProjectSaga.theoDoiUpdateContentProjectSaga(),
    CreateProjectSaga.theoDoiDeleteProjectSaga(),
    CreateProjectSaga.theoDoiGetProjectDetailSaga(),
    CreateProjectSaga.theoDoiGetAllProjectSaga(),
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    PrioritySaga.theoDoiPrioritySaga(),
    TaskSaga.theoDoiTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskSaga(),

    TaskSaga.theoDoiHandleChangePostApiSaga(),
    StatusSaga.theoDoiGetAllStatusSaga(),
  ]);
}
