import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../action';
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'
import { DollarCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import SizeSelection from '../SizeSelection';


function ItemSlider({ item }) {

  const { _id, name, defaultImage, brand, price } = item
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleAddToCart = (item) => { dispatch(addToCart(item)) }
  const [showModal, setShowModal] = useState(false)
  const onCloseModal = () => { setShowModal(!showModal) }
  return (
    <>
      <div className="items" key={_id} >
        <img className='imgProduct' src={defaultImage.thumbUrl} alt="" />
        <div className='overplayed'>
          <input type="button" value='Add to cart' className='add' onClick={() => { setShowModal(!showModal) }} />
        </div>
        <Link to={`/products/${_id}`} className='overplayss'><input type="button" value='More Detail' className='adds' /></Link>
        <div className="name-cost">
          <div className="costProduct"><DollarCircleOutlined /> {price}</div>
          <div className="name font-Helvetical" onClick={() => navigate(`/products/${_id}`)}>
        <Typography.Paragraph ellipsis >{name}</Typography.Paragraph>
          <div className='type'>{brand}</div>
        </div>
        </div>
      </div>
      <SizeSelection open={showModal} item={item} addItem={handleAddToCart} handleClose={onCloseModal} />
    </>
  )
}

export default ItemSlider