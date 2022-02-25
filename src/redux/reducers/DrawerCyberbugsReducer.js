import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_EDIT_PROJECT,
  OPEN_FORM_CREATE_TASK,
  SET_SUBMIT_CREATE_TASK,
} from "../constants/Cyberbugs/Cyberbugs";
import React from "react";
const stateDefault = {
  visible: false,
  title: "",
  ComponentContentDrawer: <p>default content</p>, //: viết dưới dạng jsx
  //   ComponentContentDrawer: () => {
  //     return <p>default content</p>; //viết dưới dạng tag (thẻ)
  //   },
  callBackSubmit: (propsValue) => {
    alert("click demo!");
  },
};

export const DrawerCyberbugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case OPEN_DRAWER: {
      return { ...state, visible: true };
    }
    case CLOSE_DRAWER: {
      return { ...state, visible: false };
    }
    case OPEN_FORM_EDIT_PROJECT: {
      return {
        ...state,
        visible: true,
        title: action.title,
        ComponentContentDrawer: action.Component,
      };
    }

    case SET_SUBMIT_EDIT_PROJECT: {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }
    case SET_SUBMIT_CREATE_TASK: {
      return { ...state, callBackSubmit: action.submitFunction };
    }
    case OPEN_FORM_CREATE_TASK: {
      state.visible = true;
      state.title = action.title;
      state.ComponentContentDrawer = action.ComponentContentDrawer;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
