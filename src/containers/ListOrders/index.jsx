import { List } from 'antd'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import OrderItem from '../../components/OrderItem'
import './style.scss'
export default function ListOrders() {
  const [dataset, setDataset] = useState([])
  const data = useSelector(state => state.fetchOrder.dataOrder)
  useEffect(() => {
    setDataset(data)
  }, [data])
  return (
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
  )
}
