import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  BarsOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { OPEN_FORM_CREATE_TASK } from "../../redux/constants/Cyberbugs/Cyberbugs";
import FormCreateTask from "../Forms/FormCreateTask/FormCreateTask";
const { Header, Sider, Content } = Layout;

export default function SidebarCyberbugs() {
  const [state, setState] = useState({
    collapsed: false,
  });
  const dispatch = useDispatch();
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: window.innerHeight }}
      >
        <div
          className="text-right text-light pr-2"
          style={{ fontSize: "25px", cursor: "pointer" }}
          onClick={toggle}
        >
          <BarsOutlined />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<FileAddOutlined style={{ fontSize: "20px" }} />}
            onClick={() => {
              dispatch({
                type: OPEN_FORM_CREATE_TASK,
                title: "Create task",
                ComponentContentDrawer: <FormCreateTask />,
              });
            }}
          >
            <span> Create Task</span>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<SearchOutlined style={{ fontSize: "20px" }} />}
          >
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
