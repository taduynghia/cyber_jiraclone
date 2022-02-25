import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
} from "../../redux/constants/Cyberbugs/Cyberbugs";
const { Option } = Select;
export default function DrawerCyberbugs(props) {
  const { visible, ComponentContentDrawer, callBackSubmit, title } =
    useSelector((state) => state.DrawerCyberbugsReducer);

  const dispatch = useDispatch();
  const showDrawer = () => {
    dispatch({
      type: OPEN_DRAWER,
    });
  };

  const onClose = () => {
    dispatch({
      type: CLOSE_DRAWER,
    });
  };

  return (
    <div>
      {/* <button
        onClick={() => {
          showDrawer();
        }}
      >
        showDrawer
      </button> */}
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                onClick={() => {
                  callBackSubmit();
                }}
                type="primary"
              >
                Submit
              </Button>
            </Space>
          </div>
        }
      >
        {/* // Nội dung thay đổi của drawer */}
        {/* :viết dưới dạng jsx */}
        {ComponentContentDrawer}
        {/* Viết dưới dạng thẻ */}
        {/* <ComponentContentDrawer /> */}
      </Drawer>
    </div>
  );
}
