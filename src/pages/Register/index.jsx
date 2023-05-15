import React, { useState } from 'react';
import { Form, Button, Input, DatePicker, Tag, message } from 'antd'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom';
import addNewAccount from '../../services/addNewAccount';
const { Item } = Form
const key = 'signign-up';
const openMessage = () => {
    message.loading({
        content: 'Loading...',
        key,
    });
    setTimeout(() => {
        message.success({
            content: 'Sign up success!',
            key,
            duration: 2,
        });
    }, 1000);
};
const Register = () => {
    const [password, setPassword] = useState("")
    const [isSame, setIsSame] = useState(false)
    const navigate = useNavigate()
    const handleRegist = value => {
        const data = { ...value }
        delete data.repassword
        addNewAccount(data)
    }
    return (
        <div className='register'>
            <h1>SIGN UP</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                autoComplete="off"
                layout="horizontal"
                onFinish={
                    value => {
                        handleRegist(value)
                        openMessage()
                        navigate('/login')
                    }
                }

            >
                <Item
                    label="Email"
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email.',
                            type: 'email'
                        }

                    ]}>
                    <Input />
                </Item>
                <Item
                    label="Full name"
                    name='username'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name.',
                        }

                    ]}>
                    <Input />
                </Item>
                <Item
                    label="Birthday"
                    name='birthday'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your birthday.',
                            type: 'object'
                        }

                    ]}>
                    <DatePicker format={'L'} style={{
                        width: '100%',
                    }} />
                </Item>
                <Item
                    label="Phone number"
                    name='phone'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number.'
                        }

                    ]}>
                    <Input />
                </Item>
                <Item
                    label="Address"
                    name='address'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your address.',
                            type: 'string'
                        }

                    ]}>
                    <Input />
                </Item>
                <Item
                    label="Password"
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password.'
                        }

                    ]}>
                    <Input.Password onBlur={(e) => setPassword(e.target.value)} />
                </Item>
                <Item
                    label="Confirm Password"
                    name='repassword'
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm input your password.'
                        }

                    ]}>
                    <Input.Password
                        status={!isSame && password.length > 0 && 'error'}
                        onBlur={
                            (e) => setIsSame(e.target.value === password && password.length > 0)
                        }
                    />
                </Item>
                <Item style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button htmlType='submit' type='danger' size='large' disabled={!isSame}>Register</Button>
                </Item>
                <div className='title'>Already a member,&nbsp;<Link to='/login'>Sign in</Link></div>
            </Form>
        </div>
    );
}

export default Register;
