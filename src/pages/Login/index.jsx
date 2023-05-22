import React, { useEffect, useState } from 'react'
import './style.scss'
import { useCookies } from 'react-cookie'
import logo from "../../assets/images/logo-dark.png"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message, Checkbox } from 'antd';
import loginUser from '../../services/loginUser';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../action';




const Login = () => {
    const dispatch = useDispatch()
    const success = () => message.success('Login success.');
    const error = () => message.error('Wrong email or password.');
    const path = useSelector(state => state.path.pathname)
    const [name, setName] = useState('');
 const [pwd, setPwd] = useState('');
 const [cookies, setCookie] = useCookies()
 const [isChecked, setIsChecked] = useState(false || cookies['Checked'])
 console.log(isChecked);
 
 const handleSavePassword = () => {
   if(name && pwd !== null)
   {
       setCookie('Name', name, { path: '/' });
       setCookie('Password', pwd, { path: '/' });
   }
};

const handleCheckbox = () => {
 if(!isChecked)
 {
   setIsChecked(true)
   setCookie("Checked", isChecked)
 }
 else{
   setIsChecked(false)
 }
}
const onName = (e) => {
 setName(e.target.value)
 console.log(name);
} 
const onPassword = e => {
 setPwd(e.target.value)
 console.log(pwd);
}
    const navigate = useNavigate()
    const handleGetRes = (res) => {

            if (_.isEmpty(res)) {
                error()
            }
            else {

                if (res?.isActive) {
                    dispatch(login(res))
                    if(isChecked)
                    {
                        handleSavePassword()
                    }
                    success()
                    res.role === 'customer'
                        ? navigate(`/${path}`)
                        : navigate('/admin')
                } else {
                    navigate(`/${res._id}/banned`)
                }
            }

    }
    const handleLogin = (value) => {
      console.log(value);
        loginUser(value, handleGetRes)
       
    }

    return (


        <div className="main py-12 xl:pl-14 px-10" >
      <div className="container h-[100%] bg-white max-w-md px-14 xl:px-24 pt-10 xl:w-[40%] flex flex-col rounded-[30px]">
        <img src={logo} alt='logo of our store' width={100} height={100} style={{marginLeft: '-1.7rem'}}  />
        <h2 className='text-darkBlue font-black text-3xl mb-2'>Sign In</h2>
        <p className='text-darkBlue font-medium text-xs mb-7'>Welcome back! Please sign in to your account</p>
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={value => handleLogin(value)}
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
        initialValue={cookies["Name"] !== null ? cookies["Name"] : null}
      >
        <Input  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" value={name} onChange={onName}/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
        initialValue={cookies["Password"] !== null ? cookies["Password"] : null}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={onPassword}
        />
      </Form.Item>

      <Form.Item>
        <div className='flex justify-between'>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox onClick={handleCheckbox} checked={isChecked} 
                  onChange={e => setIsChecked(e.target.checked)}>Remember me</Checkbox>
        </Form.Item>
        <Link className="login-form-forgot" to="/forgotPassword">
          Forgot password
        </Link>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="default" htmlType="submit" className="login-form-button" style={{width: "100%", color: "white", backgroundColor: "#1E325C"}}>
          Sign in
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
    </Form>
    <p className='text-sm text-darkBlue font-normal text-center'>Don't have an acoount? <Link to="/register" className='font-medium'>Register now!</Link></p>
      </div>
    </div>
        

    )

}
export default Login