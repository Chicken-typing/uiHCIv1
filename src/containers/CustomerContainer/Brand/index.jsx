import React, {useState, useEffect} from 'react'
import Item from '../../../components/Item'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../../action';
import { fetchAdvertise } from '../../../action/fetchAdvertises';
import { CardBrand } from './CardBrand';
import {Data} from '../../../Data/Data'
import ImageBackground from './ImageBackground';
import { BackTop } from 'antd';
import { useLocation } from 'react-router';
import { getPath } from '../../../action';

function Brand() {

    const [active, setActive] = useState("Nike")


    const dispatch = useDispatch();
    useEffect(() => {      
        dispatch(fetchProduct())
        dispatch(fetchAdvertise())
    }, [])
    const res = useSelector(state => state.fetchProduct.products)
    const nike = res.filter(val => val.brand === 'Nike')
    const adidas = res.filter(val => val.brand === 'Adidas')
    const location = useLocation().pathname.split('/')
    useEffect(() => {
      dispatch(getPath(location[1]))
    })
    const data = [
        {
            image:
              'https://i.pinimg.com/474x/84/20/de/8420de8b5fe9def59b3b6ddd5a94f2ce.jpg',
            title: 'Best forests to visit in North America',
            category: 'NIKE',
          },
    ]
    const data1 = [
        {
            image:
              'https://w0.peakpx.com/wallpaper/75/712/HD-wallpaper-adidas-shoes-estg-htrh.jpg',
            title: 'LIFE IS SHORT, BUY THIS SHOES',
            category: 'ADIDAS',
          },
    ]
    const background = [
      {
        image: 'https://wallpaperaccess.com/full/3512023.jpg',
        title: 'Our main Brand'
      }
    ]
  return (
    <div>
        {background.map((info) => (
          <ImageBackground info={info} />
        ))}
        <h2 className="mt-[20px] text-2xl font-bold tracking-tight text-gray-700 text-center">Our Brand</h2>
       <div  className='lg:flex justify-evenly mt-[20px] lg:p-[25px]  m-md:flex m-md:flex-col m-md:justify-center m-md:items-center ' id='main-title'>
       <div className='relative  '>
            <CardBrand  data={data} />
            <button type='button' data-mdb-ripple="true" 
            data-mdb-ripple-color="light" 
            className=' p-[15px] border-2 x] bg-gray-200 text-gray-700 font-[700] text-sm leading-tight uppercase rounded-2xl shadow-md
             hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-gray-400 active:shadow-lg
               transition duration-150 ease-in-out absolute bottom-[20px] left-[20px]' 
              onClick={() => setActive('Nike')}>More Product</button>
        </div>
        <div className='relative'>
            <CardBrand data={data1}/>
            <button ype='button' data-mdb-ripple="true" 
            data-mdb-ripple-color="light" className='p-[15px] border-2 x] bg-gray-200 text-gray-700 font-[700] text-sm leading-tight uppercase rounded-2xl shadow-md
             hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-gray-400 active:shadow-lg
               transition duration-150 ease-in-out absolute bottom-[20px] left-[20px]'
             onClick={() => setActive('Adidas')}>More Product</button>
        </div>
       </div>
       <div className='contain xl:px-[160px] s:px-[40px] ss:px-[60px] smd:px-[160px] grid grid-cols-4  gap-y-[24px] gap-x-[24px] xl:grid-cols-4 sm:grid-cols-1 s:grid-cols-1 md:grid-cols-2'>
        {active ===  'Nike' && nike.map((info) => {
            return <Item info={info} />
        })}
        {active === 'Adidas' && adidas.map((info) => {
            return <Item info={info} />
        })}
       </div>   
       <BackTop style={{right:'50px'}}/>     
    </div>
 
  )
}

export default Brand