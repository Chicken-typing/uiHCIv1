import React, { useState, useEffect } from 'react'
import Slider from '../../../components/Slider'
import axios from 'axios';
import Advertise from '../../../components/Advertise';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvertise } from '../../../action/fetchAdvertises';
import {fetchProduct} from "../../../action/fetchProducts"
import Item from '../../../components/Item';
import Filter from '../../../components/Filter';
import {BackTop} from 'antd'
import { useLocation } from 'react-router';
import { getPath } from '../../../action';
import { advertise } from '../../../Data/DataSlider';

function Kid() {
  
  const dispatch = useDispatch();
  useEffect(() => {      
    dispatch(fetchAdvertise())
      dispatch(fetchProduct())
  }, [])
  const location = useLocation().pathname.split('/')
  useEffect(() => {
    dispatch(getPath(location[1]))
  })


  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState()


  const res = useSelector(state => state.fetchProduct.products)
  const check = res.filter(item => item.category.includes('kid'))

  useEffect(() => {
    setFilter(all)
    setProducts(check)
  }, [res])

  const filterHighLow = () => {
      setFilter('HighLow')
      const datas = [...check]
      datas.sort((a,b) => {
        return b.price - a.price
      })
      setProducts(datas)
  }
  const filterLowHigh = () => {
    setFilter('lowhigh')
      const datas = [...check]
      datas.sort((a,b) => {
        return a.price - b.price
      })
      setProducts(datas)

  }
  const filterNike = () => {
    setFilter('nike')
    const datas = [...check]
    datas.filter((val) =>  val.brand === 'Nike')
    setProducts( datas.filter((val) => val.brand === "Nike"))

  }
  const filterAdidas = () => {
    setFilter('adidas')
    const datas = [...check]
    datas.filter((val) =>  val.brand === 'Adidas')
    setProducts( datas.filter((val) => val.brand === "Adidas"))
  }
  const all = () => {
    setFilter('all')
    setProducts(check)
  }
  return (
    <div>
      <Advertise DataInfo={advertise} />
      <h3 className='mt-[30px] text-center font-normal font-Helvetical text-3xl italic text-light-black'>More Product</h3>
      <div className='contain xl:px-[160px] s:px-[40px] ss:px-[60px] lg:px-[200px] smd:px-[160px]'>
        <div className='flex justify-between'>
          <h2 className='mt-[20px] lg:text-4xl font-medium font-Helvetical text-2xl'>Kid's Shoes</h2>
          <Filter filterHighLow={filterHighLow} filterLowHigh={filterLowHigh} filterNike={filterNike} filterAdidas={filterAdidas} all={all}/>
        </div>
        <div className='list-product mt-[20px] mx-auto my-auto'>
          <div className='grid grid-cols-4  gap-y-[24px] gap-x-[24px] xl:grid-cols-4 sm:grid-cols-1 s:grid-cols-1 md:grid-cols-2'>
          {filter === 'all' && products.map((info) => {
              return <Item info={info} />
            })}
            {filter === 'HighLow' && products.map((info) => {
              return <Item info={info} />
            })}
            {filter === 'lowhigh' && products.map((info) => {
              return <Item info={info} />
            })}
            {filter === 'nike' && products.map((info) => {
              return <Item info={info} />
            })}
             {filter === 'adidas' && products.map((info) => {
              return <Item info={info} />
            })}
          </div>
        </div>
      </div>

      <BackTop style={{right:'50px'}}/>

    </div>
  )
}

export default Kid