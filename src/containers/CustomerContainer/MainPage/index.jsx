import React, { useEffect } from 'react'
import Slider from '../../../components/Slider'
import ListPopular from '../../../components/ListPouplar'
import News from './News'
import { DataPopular } from '../../../Data/DataPopular'
import { BackTop } from 'antd';
import './style.scss'
import MainBackground from '../../../components/MainBackground'
import { useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { getPath } from '../../../action'
function MainPage() {

  const dispatch = useDispatch()
  const location = useLocation().pathname.split('/')
  useEffect(() => {
    dispatch(getPath(location[1]))
  })


  return (
    <div className="main-page  ">
      <div className='popular_container m-s:px-[10px] '>
        <MainBackground />
        <ListPopular  />
      </div>
      <div id='news' className='justify-center items-center'><News /></div>
      <BackTop style={{ right: '25px', bottom: '285px' }} visibilityHeight={ 200} />
    </div>
  )
}
export default MainPage
