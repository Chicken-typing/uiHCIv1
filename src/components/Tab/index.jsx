import React, {useState,  useEffect} from 'react'
import './style.scss'
import {Link, useLocation} from 'react-router-dom';

function Tab({label, url}) {

    const { pathname } = useLocation();
    const [underlined, setUnderlined] = useState(false)

useEffect(() => {
  const is_current_route = url === pathname;
   setUnderlined(is_current_route);
}, [pathname])

  return (
    <li  className='list'>
    <Link to={url} className='link'>
        {label}
    </Link>
    </li>
  )
}

export default Tab