import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemSlider from '../ItemSlider';
import './style.scss'
import { ArrowCircleRightOutlined, ArrowCircleLeftOutlined } from '@mui/icons-material';
function Popular({data}) {

    let slidesToShow = 5;

  const PreviousBtn = (props) => {
    const { className, onClick, currentSlide } = props;
    return (
      <>
        {currentSlide !== 0 && (
          <div className={className} onClick={onClick} style={{ position: 'absolute', left: '-17px', bottom: '-150px', zIndex: '40'}} >    
            <ArrowCircleLeftOutlined className='arrow-icon' />
          </div>

        )}
      </>
    );
  };
  const NextBtn = (props) => {
    const { className, onClick, slideCount, currentSlide } = props;
    return (
      <>
        {currentSlide !== slideCount - slidesToShow && (
          <div className={className} onClick={onClick}    >     
            <ArrowCircleRightOutlined className='arrow-icon'/>
          </div>
        )}
      </>
    );
  };
  const settings = {
    dot: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextBtn />,
    prevArrow: <PreviousBtn />,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]      
};

  return (
    <div className='info'>
          <Slider {...settings}>
          {data.map(item => {
          return <ItemSlider  item={item}/>
          })} 
          </Slider>        
        </div>
  )
}

export default Popular