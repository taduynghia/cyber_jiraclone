import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  Avatar,
  Image,
  Popover,
  AutoComplete,
} from "antd";

import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
  EDIT_CONTENT_PROJECT,
  DELETE_PROJECT_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbugs";
import {
  GET_USER_API,
  ADD_USER_PROJECT_API,
  REMOVE_USER_PROJECT_API,
} from "../../../ultil/constants/settingSystem";
import FormEditProject from "../../../components/Forms/FormEdidProjectManagement/FormEditProject";
import { Popconfirm, message } from "antd";
import { NavLink } from "react-router-dom";

export default function ProjectManagement(props) {
  const projectList = useSelector(
    (state) => state.GetProjectCyberBugsReducer.projectList
  );
  //lấy user login
  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );
  const [value, setValue] = useState("");
  const { visible } = useSelector((state) => state.DrawerCyberbugsReducer);
  //Debounce search

  const searchRef = useRef(null);

  //sử dụng useDispatch để gọi action
  const dispatch = useDispatch();
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  useEffect(() => {
    dispatch({
      type: GET_LIST_PROJECT_SAGA,
    });
  }, []);
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };
  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirection: ["descend"],
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      //tham số trong antd: text - tên dự án, record :object lấy về, index
      render: (text, record, index) => {
        return <NavLink to={`projectdetail/${record.id}`}>{text}</NavLink>;
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "creator",
      //dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        //do lần đầu tiên không có name nên k có thuộc tính name, dùng toán tử ? để dùng
        return <Tag color="purple">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "member",
      key: "member",
      //custom render
      render: (text, record, index) => {
        //record là từng object
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="topRight"
                  title={"Member"}
                  content={() => {
                    return (
                      <table className="table" key={index}>
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    width="25"
                                    height="25"
                                    style={{ borderRadius: "50%" }}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    style={{
                                      borderRadius: "50%",
                                    }}
                                    onClick={() => {
                                      dispatch({
                                        type: REMOVE_USER_PROJECT_API,
                                        userProject: {
                                          userId: item.userId,
                                          projectId: record.id,
                                        },
                                      });
                                    }}
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar
                    key={index}
                    src={<Image src={member.avatar} style={{ width: 32 }} />}
                  />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : " "}
            <Popover
              placement="rightTop"
              title={<span>Add user</span>}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    //value của lable mỗi lần set state change
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      //value là thuộc tính người dùng chọn
                      console.log("userId", value);
                      //option là mảng có lable và value
                      console.log("option", option);
                      //set giá trị của hộp thoại = option.label
                      setValue(option.label);
                      //Gọi api gửi về backend
                      dispatch({
                        type: ADD_USER_PROJECT_API,
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    style={{ width: "100%" }}
                    onSearch={(value) => {
                      console.log(" value onSearch", value);

                      //các lần sau searchRef có giá trị sẽ thực thi hàm bên dưới
                      if (searchRef) {
                        clearTimeout(searchRef.current);
                      }
                      //lần đầu tiên searchRef = null =>thực thi hàm bên dưới
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: GET_USER_API,
                          keyWord: value,
                        });
                      }, 300);
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <button
              className="btn btn-primary"
              onClick={() => {
                const action = {
                  type: OPEN_FORM_EDIT_PROJECT,
                  title: "Edit Project",
                  Component: <FormEditProject />,
                  // SubmitFunction: () => {},
                };
                //dispacth action mở form lên reducer
                dispatch(action);
                //dispatch cập nhật dữ liệu dòng hiện tại lên reducer
                const actionEditProject = {
                  type: EDIT_CONTENT_PROJECT,
                  projectEditModel: record,
                };
                dispatch(actionEditProject);
              }}
            >
              <EditOutlined />
            </button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({ type: DELETE_PROJECT_SAGA, idProject: record.id });
              }}
              //onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined />
              </button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="container my-5 mx-auto">
      <h3>Project Management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
