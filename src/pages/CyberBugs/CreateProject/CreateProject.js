import React, { useEffect } from "react";
import { withFormik } from "formik";
import { connect, useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbugs";
function CreateProject(props, { initialValue }) {
  const [value, setValue] = useState(initialValue ?? "");
  useEffect(() => setValue(initialValue ?? ""), [initialValue]);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const handleEditorChange = (newValue, editor) => {
    setValue(newValue);
    //lấy sự kiện setFieldValue để lấy giá trị
    setFieldValue("description", newValue);
  };
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();
  useEffect(() => {
    //gọi api lấy dữ liệu về thẻ option
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA,
    });
  }, []);
  return (
    <div className="container mt-4">
      <form
        className="container mt-4"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <h3>Create Project</h3>
        <div className="form-group">
          <p>Name</p>
          <input type="text" className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>

          <Editor
            name="description"
            initialValue={initialValue}
            value={value}
            onEditorChange={handleEditorChange}
          />
        </div>
        <div className="form-group">
          <select
            className=" form-control"
            name="categoryId"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" className="btn btn-outline-primary ">
          Create Project
        </button>
      </form>
    </div>
  );
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  //trả về object
  mapPropsToValues: (props) => {
    console.log("propsvalue", props);
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },

  //validate
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("values", values);
    //dispatch khi nhấn submit
    props.dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: values,
    });
  },

  displayName: "createProjectFormik",
})(CreateProject);

const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
  };
};
export default connect(mapStateToProps)(createProjectForm);
