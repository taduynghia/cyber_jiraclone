import React from "react";
import { Input, Button } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { signinCyberbug_action } from "../../../redux/actions/CyberBugAction";
export function LoginCyberBugs(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center">Login cyberbugs</h3>
        <div className="w-100 mb-3 mt-5">
          <Input
            type="email"
            name="email"
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.email && errors.email ? (
          <div className="text-danger">{errors.email}</div>
        ) : null}

        <div className="w-100 ">
          <Input.Password
            name="password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=" password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        {touched.password && errors.password ? (
          <div className="text-danger m-0">{errors.password}</div>
        ) : null}
        <Button
          htmlType="submit"
          className="btn btn-primary w-100 mt-5"
          style={{ backgroundColor: "Highlight" }}
        >
          Login
        </Button>
        <div className="social mt-5">
          <Button
            type="primary"
            shape="circle"
            icon={<FacebookOutlined />}
            size={"large"}
            style={{ marginRight: "16px" }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<TwitterOutlined />}
            size={"large"}
          />
        </div>
      </div>
    </form>
  );
}

const LoginCyberBugsWithFormik = withFormik({
  //mapPropsToValues: l?? nh???ng tr?????ng value c?? trong input: email, password
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),

  // Custom sync validation: d??ng yup
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid !")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must have min 6 characters")
      .max(32, "Password have max 32 characters"),
  }),
  //h??m l???y d??? li???u t??? form khi ng?????i d??ng submit
  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    // let action = {
    //   type: USER_SIGNIN_API,
    //   userLogin: {
    //     email: values.email,
    //     password: values.password,
    //   },
    // };
    props.dispatch(signinCyberbug_action(email, password));

    //console.log(props);
    //console.log(email, password);
  },

  //t??n c???a form n??y
  displayName: "Login CyberBugs",
})(LoginCyberBugs);
//g???i h??m connect c???a redux() xong sau ???? g???i h??m 1 l???n n???a r???i truy???n v??o tham s??? 1 component (HOC)
export default connect()(LoginCyberBugsWithFormik);
