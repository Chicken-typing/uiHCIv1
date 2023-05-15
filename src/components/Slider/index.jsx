import React, {useState, useRef, useEffect} from 'react'
import './style.scss'

function Slider({Data}) {
    const delay = 5000
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === Data.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    )
    return () => {
      resetTimeout();
    };
  }, [index])


  return (
    <div className="slideshow">
        <div className="slideshowSlider"  style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
          {Data.map((item, index) => (
              <div
              className="slide"
              key={index}
              style={{backgroundImage: `url(${item.img})`}}
            ></div>
          ))}
        </div>

        <div className="slideshowDots">
        {Data.length > 1 && Data.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " actives" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
      </div>
  )
}

export default Slider