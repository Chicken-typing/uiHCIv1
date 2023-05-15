import React from 'react'
import './style.scss'
import ImgNews from '../../assets/images/Img-news.png'
export default function NewsItem() {
  return (
      <div className='item-news'>
          <img src={ImgNews} alt="Img-news" />
          <div className='news-title'>Looks Good. Runs Good. Feels Good.</div>
      <p className='news-description'>
        A smooth ride with an endless amount of comfort, the Nike React Infinity Run Flyknit 3 is the first step towards your best run yet</p>
    </div>
  )
}
