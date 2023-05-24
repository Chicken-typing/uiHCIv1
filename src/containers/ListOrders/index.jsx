import { List, Select } from 'antd'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import OrderItem from '../../components/OrderItem'
import './style.scss'
export default function ListOrders() {
  const [dataset, setDataset] = useState([])
  const [filter,setFilter]=useState('')
  const data = useSelector(state => state.fetchOrder.dataOrder)
  useEffect(() => {
    setDataset(data)
  }, [data])
  const options = [{
    value: 'paid',
    label: 'Paid',
  },
    {
      value: 'unpaid',
      label: 'Unpaid',
    },
    {
      value: 'isDelivered',
      label: 'Delivered',
    },
  ]
  const handleChange = (value) => {
    setFilter(value)
    switch (value) {
      case 'paid': {
        
      }
      case 'unpaid': { 

      }
      case 'isDelivered': { 

      }
        
        
    }
  };
  return (
    <>
      <div><Select
        mode="single"
        style={{
          width: '100%',
        }}
        placeholder="Please select"
        defaultValue={['Paid']}
        onChange={handleChange}
        options={options}
      /></div>
    < List
      itemLayout="vertical"
      pagination={{
        position: "top",
        responsive: true,
        showSizeChanger: false,
        pageSize: 12
      }}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }
      }
      dataSource={dataset}
      renderItem={(item) => (
        <OrderItem item={item} />
      )}
      />
      </>
  )
}
