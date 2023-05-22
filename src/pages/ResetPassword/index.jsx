import React from "react";
import logo from "../../assets/images/logo-dark.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
export default function ResetPassword() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="main_background py-12 xl:pl-14 px-10">
      <div className="container_box_shadow h-[100%] bg-white max-w-md px-14 xl:px-24 pt-10 xl:w-[40%] flex flex-col rounded-[30px]">
        <img
          src={logo}
          alt="logo of our store"
          width={100}
          height={100}
          style={{ marginLeft: "-1.7rem" }}
        />
        <h2 className="text-darkBlue font-black text-2xl mb-2">
          Reset Password
        </h2>
        <p className="text-darkBlue font-medium text-xs mb-7">
          We have sent a vertification code by email to <span>[email address]</span>. Enter it below to reset your password
        </p>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              placeholder="Code OTP"
              prefix={<MailOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              type="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm password!"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="login-form-button"
              style={{
                width: "100%",
                color: "white",
                backgroundColor: "#1E325C",
              }}
            >
              SEND
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}