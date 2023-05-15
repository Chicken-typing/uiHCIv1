import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { addToCart } from '../../action';
import './style.scss'
import { DollarCircleOutlined } from '@ant-design/icons';

import { Typography } from 'antd';

import SizeSelection from '../SizeSelection';

export default function Item({ info }) {


  const { _id, name, defaultImage, brand, price } = info
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleAddToCart = (item) => { dispatch(addToCart(item)) }
  const [showModal, setShowModal] = useState(false)
  const onCloseModal = () => { setShowModal(!showModal) }
  return (
    <>
      <div className="item" key={_id} >
        <img className='imgProduct' src={defaultImage.thumbUrl} alt="" />
        <div className='overplay'>
          <input type="button" value='Add to cart' className='add' onClick={() => { setShowModal(!showModal)}} />
        </div>
        <Link to={`/products/${_id}`} className='overplays'><input type="button" value='More Detail' className='adds'
        /></Link>
        <div className="name-cost">
          <div className="costProduct"><DollarCircleOutlined />{price}</div>
          <div className="name font-Helvetical" onClick={() => navigate(`/products/${_id}`)}>
        <Typography.Paragraph ellipsis >{name}</Typography.Paragraph>
          <div className='type'>{brand}</div>
        </div>
        </div>
      </div>
      <SizeSelection open={showModal} item={info} addItem={handleAddToCart} handleClose={onCloseModal} />

    </>
  )
}
