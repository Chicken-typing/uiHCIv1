import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../action/Shipping';
import { Button, Form, Input, Radio } from 'antd';
import { Group } from '@mantine/core';
import 'react-toastify/dist/ReactToastify.css'

function Shipping({ onClick }) {
const user = useSelector(state=>state.User.userInfor)
  // Use hooks to declare information
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const handleBack = () =>navigate('/cart')
  

  const handleNext = () => {
    form.submit()
    navigate('/checkout/payment')
    onClick()
  }


  return (
      <div className=" p-4">
        <h1 className="my-3 text-2xl">Shipping Address</h1>
        <Form
          form={form}
          layout="vertical"
        onFinish={(value) => dispatch(saveShippingAddress(value))}>
          <Form.Item label="Full name"
            tooltip="Please input your full name"
            name='fullName'
            rules={[
            {
              required: true,
              message: 'Email is empty'
            },
          ]}
        initialValue={user.username}>
            <Input placeholder="Your full name"  />
          </Form.Item>

          <Form.Item label="Phone number"
            tooltip="Input your correct phone number"
            name='phone'
            rules={[
            {
              required: true,
              message: 'Phone number is empty'
            },
          ]} initialValue={user.phone}>
            <Input placeholder="Your phone number" />
          </Form.Item>
          <Form.Item label="Address"
            tooltip="Input your correct address"
            name='address'
            rules={[
            {
              required: true,
              message: 'Address is empty'
            },
          ]}  initialValue={user.address}>
            <Input placeholder="Your Address" />
          </Form.Item>

          <Form.Item label="City"
            tooltip="Input your City"
            name='city'
            rules={[
            {
              required: true,
              message: 'City is empty'
            },
          ]}>
            <Input placeholder="Your City"/>
          </Form.Item>

          <Form.Item label="Postal code "
            tooltip="Input correct Postal c ode"
            name='postalCode'
            rules={[
            {
              required: true,
              message: 'Postcode is empty'
            },
          ]}>
            <Input placeholder="Postal Code"/>
          </Form.Item>

          <Form.Item label="Country "
            tooltip="Input your country "
            name="country"
            rules={[
            {
              required: true,
              message: 'Country is empty'
            },
          ]}>
            <Input placeholder="Your Country"/>
          </Form.Item>
          <Form.Item>
            <Group position="center" mt="xl">
              <Button type='default' variant="default" onClick={handleBack}>Back</Button>
              <Button type='primary' variant='default' onClick={handleNext} >Next step</Button>
            </Group>
          </Form.Item>
        </Form>

      </div>
    
  )
}

export default Shipping