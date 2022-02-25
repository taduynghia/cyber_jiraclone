import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import {
  SET_SUBMIT_EDIT_PROJECT,
  GET_ALL_PROJECT_CATEGORY_SAGA,
  UPDATE_CONTENT_PROJECT_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbugs";
import { withFormik } from "formik";
import * as Yup from "yup";
function FormEditProject(props, { initialValue }) {
  const [value, setValue] = useState(initialValue ?? "");
  const {
    setFieldValue,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  //kết nối với redux
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );

  const dispatch = useDispatch();
  //componentDidMount
  useEffect(() => setValue(initialValue ?? ""), [initialValue]);

  //sự kiện nhấn submit form.

  // const submitForm = () => {
  //   alert("submit edit");
  // };
  useEffect(() => {
    //gọi api lấy dữ liệu về thẻ option
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA,
    });
    //load sự kiện submit lên drawer nút submit
    dispatch({
      type: SET_SUBMIT_EDIT_PROJECT,
      submitFunction: handleSubmit,
    });
  }, []);
  const handleEditorChange = (newValue, editor) => {
    setValue(newValue);
    //lấy sự kiện setFieldValue để lấy giá trị
    setFieldValue("description", newValue);
  };
  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Id</p>
            <input
              className="form-control"
              type="text"
              placeholder="id"
              name="id"
              disabled
              value={values.id}
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input
              className="form-control"
              type="text"
              placeholder="Project"
              name="projectName"
              onChange={handleChange}
              value={values.projectName}
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project category</p>
            <select
              className=" form-control"
              name="categoryId"
              onChange={handleChange}
              value={values.categoryId}
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="container-fluid mt-5">
          <div className="form-group">
            <p className="font-weight-bold">Discription</p>
            <Editor
              name="description"
              initialValue={initialValue}
              value={values.description}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

const EditProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;

    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    //khi người dùng bấm submit => đưa dữ liệu về backend thông qua gọi api
    const action = {
      type: UPDATE_CONTENT_PROJECT_SAGA,
      projectUpdate: values,
    };

    //gọi saga
    props.dispatch(action);
  },

  displayName: "EditProjectForm",
})(FormEditProject);
const mapStateToProps = (state) => ({
  projectEdit: state.EditProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectForm);
