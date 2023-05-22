import React from 'react'
import './style.scss'
import logo from "../../assets/images/logo-dark.png"
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Input, message } from 'antd'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
export default function ForgotPassword() {
  const navigate = useNavigate()
    const onFinish = (values) => {
      navigate("/ResetPassword")
        console.log('Received values of form: ', values);
      };
  return (
    <div className="main py-12 xl:pl-14 px-10" >
    <div className="container h-[100%] bg-white max-w-md px-14 xl:px-24 pt-10 xl:w-[40%] flex flex-col  rounded-[30px]">
      <img src={logo} alt='logo of our store' width={100} height={100} style={{marginLeft: '-1.7rem'}}  />
      <h2 className='text-darkBlue font-black text-2xl mb-2'>Forgot Password</h2>
      <p className='text-darkBlue font-medium text-xs mb-7'>Please input your email address to reset password</p>
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
            <Input placeholder="Email" prefix={<MailOutlined className="site-form-item-icon" />} />
          </Form.Item>
    

    <Form.Item>
      <Button type="default"  htmlType="submit" className="login-form-button" style={{width: "100%", color: "white", backgroundColor: "#1E325C"}}>
        SEND
      </Button>
    </Form.Item>
    <Form.Item>
      <Button type="default" onClick={() => navigate("/login")}  className="login-form-button" style={{width: "100%", color: "#1E325C", backgroundColor: "white", fontWeight:"700", border:"1px solid #1E325C"}}>
        BACK
      </Button>
    </Form.Item>
  </Form>
  
    </div>
  </div>
  )
}