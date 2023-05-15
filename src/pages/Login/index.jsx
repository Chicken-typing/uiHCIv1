import React, { useEffect, useState } from 'react'
import './style.scss'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Button, Divider, Form, Input, message, Typography } from 'antd';
import loginUser from '../../services/loginUser';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../action';



const { Item } = Form

const Login = () => {
    const dispatch = useDispatch()
    const success = () => message.success('Login success.');
    const error = () => message.error('Wrong email or password.');
    const path = useSelector(state => state.path.pathname)
    const navigate = useNavigate()
    const handleGetRes = (res) => {

            if (_.isEmpty(res)) {
                error()
            }
            else {

                if (res?.isActive) {
                    dispatch(login(res))
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
        loginUser(value, handleGetRes)
    }

    const responseFacebook = (res) => { }
    return (


        <div className='form-container'>

            <h1>Login</h1>
            <Form
                layout='vertical'
                onFinish={value => handleLogin(value)}
            >
                <Item
                    label='Email'
                    name='email'
                    rules={[{
                        required: true,
                        message: 'Please input email',
                        type: 'email'
                    }]}
                >
                    <Input />
                </Item>
                <Item label='Password'
                    name='password'
                    rules={[{
                        required: true,
                        message: 'Please input password'
                    }]}>
                    <Input.Password />
                </Item>
                <Typography.Link>Forgot password?</Typography.Link>
                <Item>
                    <Button className='btn-login' htmlType='submit'>LOGIN</Button>
                </Item>
                <div style={{ display: 'flex' }}>Don't have an account, register&nbsp;<Link to='/register' style={{ color: 'red', textDecoration: 'none' }}>here</Link></div>
                <Divider plain>or Login with</Divider>
                <div className="fb-gmail">
                    <FacebookLogin
                        appId="1088597931155576"
                        textButton='Facebook'
                        fields="name,email,picture"
                        callback={response => responseFacebook(response)}
                        render={renderProps => (
                            <Button className='fb-button' onClick={renderProps.onClick}>Facebook</Button>
                        )}
                    />

                </div>
            </Form>

        </div>

    )

}
export default Login