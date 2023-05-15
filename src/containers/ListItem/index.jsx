import React from 'react'
import Item from '../../components/Item'
import './style.scss'
export default function ListItem({ listItems }) {
  return (
    <div>
      {listItems.map(item => (
        <Item key={item._id} info={item} />
      ))}
    </div>
  )
}
