import {
  EDIT_CONTENT_PROJECT,
  GET_PROJECT_DETAIL,
} from "../constants/Cyberbugs/Cyberbugs";

const initialState = {
  projectEdit: {
    id: 0,
    projectName: "string",
    creator: 0,
    description: "string",
    categoryId: "string",
  },
  projectDetail: {
    members: [],
  },
};

export const EditProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_CONTENT_PROJECT: {
      state.projectEdit = action.projectEditModel;

      return { ...state };
    }
    case GET_PROJECT_DETAIL: {
      state.projectDetail = action.projectDetail;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

// export const EditProjectReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case EDIT_CONTENT_PROJECT: {
//       state.projectEdit = action.projectEditModel;
//       console.log("action.projectEditModel", action.projectEditModel);
//       return { ...state };
//     }
//     default:
//       return { ...state };
//   }
// };
