import React, { useState, useEffect } from "react";
import { Card, Space, Button, Typography } from "antd";
import { Link, useNavigate} from "react-router-dom";
import {  useSelector } from "react-redux";


function PlaceOrder({onClickBack, onClickNext, handleEdit}) {
  const data = useSelector((state) => state.Cart.carts);
  const shipping = useSelector((state) => state.ShippingInfo);
  const payment = useSelector(state => state.PaymentMethod.paymentMethod)
  const [price, setPrice] = useState(0)
  const [total, setTotal] = useState(0)
  const [ship, setShip] = useState(0)
  const taxCost = Math.round(price * 0.02 * 100) / 100

  const navigate = useNavigate()
  const handleBack = () => {
    onClickBack()
    navigate('/checkout/payment')
  }
const handleNext = () => {
  onClickNext()
}
const subTotal = () => {
  let price = 0;
  data.map((item) =>{
      price = item.price * item.quantity + price
  });
  setPrice(price);
};

  const totalAll = () => {
    let price = 0
    let shipCost = ship
    if (data.length > 0) {
      setShip(14)
      data.map(item => {
        price = item.price * item.quantity + price
      })
      setTotal(price + shipCost)
    }
    else {
      setShip(0)
      setTotal(0)
    }
  }



useEffect(() => {
  data.length === 0 && setShip(0)
  data.length === 0 && setTotal(0)
})


useEffect(()=>{
  subTotal();
},[subTotal])

useEffect(() => {
  totalAll()
}, [totalAll])


  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Preview Order
      </h1>
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3  lg:gap-x-10  lg:pt-16 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          {/* <div>{`Name: ${shipping.shippingAddress.fullName}`}</div>
          <div>{`Addres: ${shipping.shippingAddress.address}`}</div> */}
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:col-span-1 lg:mt-0">
          <form className="mt-10" onSubmit={(e) => e.preventDefault()}>
            {/* Colors */}


            <div className='bg-gray-bg w-[100%] lg:w-[100%] h-[100%] px-2 lg:px-4 lg:py-4 lg:max-h[50%]  rounded-xl' >
          <p className='font-[600] text-gray-800 text-xl'>Order Summary</p>

          {/* SubTotal */}
            <div className='flex w-[100%] '>
              <div className='flex-1 text-gray-600 text-lg'>Subtotal</div>
               <div className='flex-1 text-end text-lg text-gray-800 font-[400] lg:py-[2px]'>{`$${price}`}</div>              
            </div>
            <div className='mt-3 mb-3 lg:border-t lg:border-gray-400  '></div>


          {/* Shipping Cost   */}
            <div className='flex w-[100%]'>
               <div className='flex-1 text-gray-600 text-lg'>Shipping Cost</div>
               <div className='flex-1 text-end text-lg text-gray-800 font-[400] lg:py-[2px]'>{`$${ship}`}</div>
            </div>
            <div className='mt-3 mb-3 lg:border-t lg:border-gray-400 '></div>

{/* SubTotal */}
            <div className='flex w-[100%] '>
              <div className='flex-1 text-gray-600 text-lg'>Tax Cost</div>
               <div className='flex-1 text-end text-lg text-gray-800 font-[400] lg:py-[2px]'>{`$${taxCost}`}</div>              
            </div>
            <div className='mt-3 mb-3 lg:border-t lg:border-gray-400  '></div>

          {/* Total   */}
            <div className='flex w-[100%]'>
               <div className='flex-1 font-[600] text-gray-800 text-lg'>Order Total</div>
               <div className='flex-1 text-end text-lg text-gray-800 font-[400] lg:py-[2px]'>{`$${total +taxCost}`}</div>
            </div>


             {/* Checkout  */}
          <button className='w-[100%] bg-indigo-600 text-white lg:mt-5 items-center justify-center rounded-md border border-transparent hover:bg-indigo-700
                  focus:outline-none focus:ring-2  focus:ring-indigo-500 focus:ring-offset-2 lg:p-4'
                  onClick={handleNext}
                  >Checkout</button>
           <button
                className="w-[100%] bg-indigo-600 text-white lg:mt-5 items-center justify-center rounded-md border border-transparent hover:bg-indigo-700
                  focus:outline-none focus:ring-2  focus:ring-indigo-500 focus:ring-offset-2 lg:p-4"
                  onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>        
          </div>

          </form>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
          <Space
            direction="vertical"
            size="middle"
            style={{
              display: "flex",
            }}
          >
            <Card title="Shipping" size="small">
             <Space direction="vertical">
             <Space>
                <div className="font-bold">Name:</div>
                <div>{shipping.shippingAddress.fullName}</div>
              </Space>
              <Space>
                <div className="font-bold">Address:</div>
                <div>{shipping.shippingAddress.address}</div>
              </Space>
              <Button type="link" onClick={() => handleEdit.editInfo()}>Edit</Button>
             </Space>
            </Card>

            <Card title="Payment" size="small">
             <Space direction="vertical">
             <Space >
                <div className="font-bold">Method:</div>
                <div>{payment}</div>
              </Space>
              <Button type="link" onClick={() => handleEdit.editPayment()}>Edit</Button>
             </Space>
            </Card>

            <Card title="Items" size="small">

                  <div  className="w-[100%] lg:flex lg:justify-center lg:mb-4 m-xl:hidden">
                    <div className="lg:w-[65%] lg:text-center lg:font-bold">Product's Name</div>
                    <div className=" lg:text-right lg:w-[15%] lg:font-bold  ">Quantity</div>
                    <div className=" lg:text-right lg:w-[10%] lg:font-bold lg:mr-1 lg:ml-4">Size</div>
                  </div>

                  <Space direction="vertical" className="w-[100%]">
                 {data.map(item => (
                    <div className="lg:flex lg:justify-between w-[100%]">
                      <img className="m-sm:w-[50%] m-sm:h-[50%] lg:w-[20%] lg:h-[20%] bg-gray-nike" src={item.defaultImage.thumbUrl} alt="" />              
                     <Typography.Text ellipsis className="lg:ml-8 lg:mr-20 lg:flex-[0.6] flex-[0.5] max-w-[100%]">{item.name}</Typography.Text>
                     <div className="flex-[0.3] lg:text-center">{item.quantity}</div>

                       <div className="lg:ml-8 lg:mr-8 lg:text-center">{item.size}</div>

                    </div>
                 ))}
                  </Space>
            </Card>
            <Button variant="default" onClick={handleBack}>Back</Button>
          </Space>
          
        </div>
      </div>
      



    </div>
  );
}

export default PlaceOrder;
