import React, { useState, useEffect } from 'react'
import { Radio, Space, Button, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import { savePaymentMethod } from '../../action/Shipping';


function Payment({ onClickBack, onClickNext }) {
  const shipping = useSelector(state => state.ShippingInfo)
  const payment = useSelector(state => state.PaymentMethod.paymentMethod)
  const [value, setValue] = useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    if (!shipping.shippingAddress.address) {
      navigate('/checkout/shippingAddress');
    }
  }, [shipping, navigate])

  const handleBack = () => {
    onClickBack()
    navigate('/checkout/ShippingAddress')
  }

  const handleNext = () => {
    if (value) {
      onClickNext()
      dispatch(savePaymentMethod(value))
      navigate('/checkout/placeOrder')
    } else {
      message.warning("Please choose your payment!")
    }

  }
  return (
    <div className='lg:mt-8 lg:px-8 lg:mb-20'>
      <div className='text-3xl font-bold mb-5'>Payment Method</div>
      <Radio.Group onChange={e=>onChange(e)} value={value}>
        <Space direction="vertical" size='middle'>
          <Radio value='paypal'  ><div className='font-medium ml-1 onCh'>PayPal</div></Radio>
          <Radio value='cash'><div className='font-medium ml-1'>Cash</div></Radio>
          <Radio value='stripe' disabled><div className='font-medium ml-1'>Stripe</div></Radio>
        </Space>
      </Radio.Group>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={handleBack}>Back</Button>
        <Button variant='primary' onClick={handleNext} type='submit'>Next step</Button>
      </Group>

    </div>
  )
}

export default Payment