import { Editor } from "@tinymce/tinymce-react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Select, Radio, Slider } from "antd";
import { GET_USER_API } from "../../../ultil/constants/settingSystem";
import {
  CREATE_TASK_SAGA,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
  GET_USER_BY_PROJECT_ID_SAGA,
  SET_SUBMIT_CREATE_TASK,
} from "../../../redux/constants/Cyberbugs/Cyberbugs";
import { withFormik } from "formik";
import * as Yup from "yup";
function FormCreateTask(props, { initialValue }) {
  //Do kết nối với withformik =>compoentn có các props
  const {
    setFieldValue,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  const [value, setValue] = useState(initialValue ?? "");
  const dispatch = useDispatch();
  const { Option } = Select;

  //tạo mảng chứa data mặc định
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }
  const handleChange1 = (values) => {
    console.log(`Selected: ${values}`);
  };
  //   const SelectSizesDemo = () => {
  //     const [size, setSize] = useState('default');

  //     const handleSizeChange = e => {
  //       setSize(e.target.value);
  //     };

  //lấy dữ liệu từ redux
  const { arrProject } = useSelector(
    (state) => state.GetProjectCyberBugsReducer
  );
  //lấy task type

  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrUser } = useSelector((state) => state.UserLoginCyberBugsReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);

  //hàm biến đổi option cho thẻ select

  // const userOptions = arrUser?.map((item, index) => {
  //   console.log(arrUser);
  //   return { value: item.userId, label: item.name };
  // });
  const userOptions = arrUser?.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  //time tracking
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const handleEditorChange = (newValue, editor) => {
    setValue(newValue);
    //lấy sự kiện setFieldValue để lấy giá trị
    setFieldValue("description", newValue);
  };
  //componentDidMount
  useEffect(() => setValue(initialValue ?? ""), [initialValue]);
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
    dispatch({
      type: GET_USER_API,
      keyWord: "",
    });
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });
    //đưa hàm handle submit lên drawer reducer để cập nhật lại
    //sự kiện cho nút submit
    dispatch({
      type: SET_SUBMIT_CREATE_TASK,
      submitFunction: handleSubmit,
    });
  }, []);

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        <select
          className="form-control"
          name="projectId"
          onChange={(e) => {
            //dispath giá trị làm thay đổi arrUser
            let value = e.target.value;
            console.log(value);
            dispatch({
              type: GET_USER_BY_PROJECT_ID_SAGA,
              idProject: value,
            });
            //cập nhật giá trị cho projectId
            setFieldValue("projectId", e.target.value);
          }}
        >
          {arrProject.map((project, index) => {
            return (
              <option value={project.id} key={index}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <p>Task Name</p>
        <input
          className="form-control"
          name="taskName"
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <p>Status Id</p>
        <select
          className="form-control"
          name="statusId"
          onChange={handleChange}
        >
          {arrStatus?.map((statusItem, index) => {
            return (
              <option key={index} value={statusItem.statusId}>
                {statusItem.statusName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select
              className="form-control"
              name="priorityId"
              onChange={handleChange}
            >
              {arrPriority?.map((priority, index) => {
                return (
                  <option key={index} value={priority.priorityId}>
                    {priority.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <p>Task type</p>
            <select
              className="form-control"
              name="typeId"
              onChange={handleChange}
            >
              {arrTaskType?.map((taskType, index) => {
                return (
                  <option key={index} value={taskType.id}>
                    {taskType.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assigness</p>
            <Select
              mode="multiple"
              //size={size}
              options={userOptions}
              placeholder="Please select"
              // defaultValue={["a12", "a13"]}
              optionFilterProp="label"
              //trả
              onChange={(values) => {
                console.log("values", values);
                //do vlues nhận onChange của thẻ Select (antd) chứ k phải của
                //thẻ select thường=> không binding tự động được của formik
                //=> muốn setValue cho trường listUserAsing thì truyền tên trường
                //và giá trị truyền vào trường đó

                //disptach làm thay đổi dữ liêu user

                //set lại giá trị cho listUserAsign
                setFieldValue("listUserAsign", values);
              }}
              style={{ width: "100%" }}
              //hàm onSelect lấy ra giá trị trong khi chọn giá trị
              onSelect={(value) => {
                console.log("value", value);
              }}
            >
              {children}
            </Select>
            <div className="row mt-3">
              <div className="col-12">
                <p>Original Estimate</p>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  name="originalEstimate"
                  defaultValue={0}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-6 mt-1">
            <p>Time tracking</p>
            <Slider
              defaultValue={30}
              tooltipVisible
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
              value={timeTracking.timeTrackingSpent}
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right font-weight-bold">
                {timeTracking.timeTrackingRemaining}h logged
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <p>Time spent </p>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  name="timeTrackingSpent"
                  defaultValue={0}
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                />
              </div>
              <div className="col-6">
                <p className="text-right">Time remaining </p>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  name="timeTrackingRemaining"
                  defaultValue={0}
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          name="description"
          initialValue={initialValue}
          value={value}
          init={{
            selector: "textarea", // change this value according to your HTML
            menu: {
              file: {
                title: "File",
                items: "newdocument restoredraft | preview | print ",
              },
              edit: {
                title: "Edit",
                items: "undo redo | cut copy paste | selectall | searchreplace",
              },
              view: {
                title: "View",
                items:
                  "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen",
              },
              insert: {
                title: "Insert",
                items:
                  "image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime",
              },
              format: {
                title: "Format",
                items:
                  "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat",
              },
              tools: {
                title: "Tools",
                items: "spellchecker spellcheckerlanguage | code wordcount",
              },
              table: {
                title: "Table",
                items: "inserttable | cell row column | tableprops deletetable",
              },
              help: { title: "Help", items: "help" },
            },
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
      {/* <button className="btn btn-primary" type="submit">
        submit
      </button> */}
    </form>
  );
}
const frmCreateTask = withFormik({
  //kích hoạt thuộc tính
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    //props do formik tạo ra cho component
    const { arrProject, arrTaskType, arrPriority, arrStatus } = props;
    //nếu mảng project có phần tử thì sẽ dispatch lên phần tử mặc định đầu tiên
    //không load ra mảng rỗng
    // if (arrProject?.length > 0) {
    //   props.dispatch({
    //     type: GET_USER_BY_PROJECT_ID_SAGA,
    //     idProject: arrProject[0]?.id,
    //   });
    // }

    return {
      taskName: "",
      description: "",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      listUserAsign: [],
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("taskObject", values);
    props.dispatch({ type: CREATE_TASK_SAGA, taskObject: values });
  },

  displayName: "createTaskForm",
})(FormCreateTask);
//lấy dữ liệu từ redux về cho hàm của frmCreateTask

const mapStateToProps = (state) => {
  return {
    // const { arrProject } = useSelector(
    //   (state) => state.GetProjectCyberBugsReducer
    // );
    //   const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
    // const { arrPriority } = useSelector((state) => state.PriorityReducer);
    // const { userSearch } = useSelector(
    //   (state) => state.UserLoginCyberBugsReducer
    // );
    // const { arrStatus } = useSelector((state) => state.StatusReducer);
    // };
    arrProject: state.GetProjectCyberBugsReducer.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusReducer.arrStatus,
  };
};
export default connect(mapStateToProps)(frmCreateTask);
