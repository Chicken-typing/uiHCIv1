import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemSlider from "../ItemSlider";
import "./style.scss";
import {
  ArrowCircleRightOutlined,
  ArrowCircleLeftOutlined,
} from "@mui/icons-material";
function Popular({ data }) {
  const slideRef = useRef();
  let slidesToShow = 4;

  const settings = {
    infinite: true,
    speed: 800,
    autoplaySpeed: 2500,
    autoplay: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 797,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          draggable: true,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <button
        className="sliderNavigateBtn sliderNavigateBtn--prev"
        onClick={() => {
          slideRef.current.slickPrev();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <Slider {...settings} className="slider" ref={slideRef}>
        {data.map((item) => {
          return <ItemSlider item={item} />;
        })}
      </Slider>
      <button
        className="sliderNavigateBtn sliderNavigateBtn--next"
        onClick={() => {
          slideRef.current.slickNext();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default Popular;
