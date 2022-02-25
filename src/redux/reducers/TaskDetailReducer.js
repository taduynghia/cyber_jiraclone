import {
  CHANGE_ASSIGNESS,
  GET_TASK_DEATAIL,
  REMOVE_USER_ASSIGN,
} from "../constants/Cyberbugs/Cyberbugs";
import { CHANGE_TASK_MODAL } from "./../constants/Cyberbugs/Cyberbugs";

const initialState = {
  taskDetailModal: {
    priorityTask: {
      priorityId: 1,
      priority: "High",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [
      {
        id: 1239,
        avatar: "https://ui-avatars.com/api/?name=handsomethanh",
        name: "handsomethanh",
        alias: "handsomethanh",
      },
    ],
    lstComment: [],
    taskId: 2756,
    taskName: "task 9",
    alias: "task-9",
    description: "<p>alo alo</p>",
    statusId: "3",
    originalEstimate: 20,
    timeTrackingSpent: 10,
    timeTrackingRemaining: 30,
    typeId: 2,
    priorityId: 1,
    projectId: 3277,
  },
};

export const TaskDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DEATAIL:
      return { ...state, taskDetailModal: action.taskDetailModal };
    case CHANGE_TASK_MODAL: {
      const { name, value } = action;
      return {
        ...state,
        taskDetailModal: { ...state.taskDetailModal, [name]: value },
      };
    }
    case CHANGE_ASSIGNESS: {
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness,
        action.userSelected,
      ];
      return { ...state };
    }
    case REMOVE_USER_ASSIGN: {
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness.filter(
          (us) => us.id !== action.userId
        ),
      ];

      return { ...state };
    }
    default:
      return state;
  }
};
