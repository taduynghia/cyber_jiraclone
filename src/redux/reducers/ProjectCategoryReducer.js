import { GET_ALL_PROJECT_CATEGOTY } from "../constants/Cyberbugs/Cyberbugs";

const stateDefault = {
  arrProjectCategory: [],
};

export const ProjectCategoryReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGOTY:
      {
        state.arrProjectCategory = action.data;
      }

      return { ...state };
    default:
      return { ...state };
  }
};
