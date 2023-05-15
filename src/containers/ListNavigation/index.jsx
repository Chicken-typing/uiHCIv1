import React, {useState, useEffect, useRef} from 'react'
import Tab from '../../components/Tab'
import { Avatar, Badge } from 'antd';
import { useLocation, useParams} from 'react-router-dom';
import { Affix } from 'antd';
import './style.scss'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../action';
import { useNavigate } from 'react-router-dom';
import { Data } from '../../Data/Data';
import { Link } from 'react-router-dom'
import { addToCart } from '../../action';


function ListNavigation() {

    const [show, setShow] = useState(false)
    const {pathname} = useLocation()
    const [scroll, setScroll] = useState(false)
    const wrapperRef = useRef(null);
    const [scrollNav, setScrollNav] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0);
    const [keyword, setKeyword] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [cursor, setCursor] = useState(-1)

    let navigate = useNavigate();
    const controlNavbar = () => {
      if (typeof window !== 'undefined') { 
        if (window.scrollY > lastScrollY) {
 // if scroll down hide the navbar
          if(lastScrollY >= 130)
          {
            setScrollNav(true);
          }
           
        } else { // if scroll up show the navbar
          setShow(false)
          setKeyword("")
          if(window.scrollY > 45)
          {
            setScroll(true)   
          }
          else
          {
            setScroll(false)
          }  
          setScrollNav(false);
        }
  
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY); 
      }
    };
       

    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', controlNavbar);
  
        // cleanup function
        return () => {
          window.removeEventListener('scroll', controlNavbar);
        };
      }
    }, [lastScrollY]);

    // This state is used to hide and show search box when click icon
   const handleShow = () => {
    if(!show)
    {
      setShow(true)
      setKeyword("")
     
  }
    else {
      setShow(false)
      setKeyword("")

    }
   }

   // This function to hide the search box when change the orther tab
   useEffect(() => {
    setShow(false)
    setKeyword('')
 }, [pathname])

 // This function to hide the search box when click any where on the screen
 useEffect(() => {
  function handleClickOutside(event) {
    if (keyword === "") {
      if(wrapperRef.current && !wrapperRef.current.contains(event.target))
      {
        setShow(false)
      }
      
    }
  }
   // Bind the event listener
   document.addEventListener("mousedown", handleClickOutside);
   return () => {
     // Unbind the event listener on clean up
     document.removeEventListener("mousedown", handleClickOutside);
   };
}, [wrapperRef])

const handle = e => {
  // This function to set value onChange and when search can not find product will show message.
  setKeyword(e.target.value)
  setSearchResult(res
    .filter((item) => {
      const searchTerm = keyword.toLowerCase();
      const fullName = item.name.toLowerCase();

      return (
        searchTerm &&
        fullName.startsWith(searchTerm) &&
        fullName !== searchTerm
        
      );
    })
    .slice(0, 10))
} 

// Use this function to press Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setKeyword(event.target.value)
      event.target.value = ''
    }
    if (event.key === 'ArrowDown') {
      show ? setCursor(C => (C < searchResult.length - 1 ? C + 1 : C)): setShow(true)
    }
    if (event.key === "ArrowUp") {
      setCursor(c => (c > 0 ? c - 1 : 0));
    }
    if (event.key === "Escape") {
      setShow(false)
  }
  

  }
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchProduct())
  }, [])
  const res = useSelector(state => state.fetchProduct.products)

  // const thisProduct = res.find(prod => prod.name === productName)




 
const data = useSelector(state => state.Cart.carts)


  return (
   <Affix>
     <div className="all">
      <header className={`header  ${scrollNav && 'hidden'}`} style={{top: scroll ? '0' : '' , position: scroll ? 'fixed': ''}}>       
        <nav className='navbar'>

        <ul className="ul-container max-[570px]:absolute max-[570px]:flex-col " ref={wrapperRef}   >
            {/* <Tab label="Home" url="/main-page" />
            <Tab label="Woman" url="/woman" />
            <Tab label="Man" url="/man" />
            <Tab label="Kid" url="/kid" />            
           <Tab label="Brand" url="/brand" />  */}
           <li id='search-engine'>
              <Tooltip title="search">
              <Button id='search-icon' shape="circle" icon={<SearchOutlined />} size="large" onClick={handleShow} style={{top: '-5px'}}
               />
              <input 
              value={keyword} 
              onKeyDown={handleKeyDown}
              onFocus={() => setKeyword("")}
              className={show ? "show-box" : "search-box disable"} 
              onChange={handle}
              type="text"  />
              </Tooltip>
            </li>
            <div  className='dropdown' style={{display: keyword.length > 0 ? 'block' : 'none', visibility: show ? 'visible' : 'hidden'}} >
            { searchResult.length > 0 ? searchResult
            .map((item) => (
              <div
                onSelect={item}
                onClick={() => navigate(`/products/${item.name}`)}
                className={show ?'dropdown-row': 'dropdown_close'}
                style={{visibility: show ? 'visible': 'hidden'}}
                key={item.id}
              >
                <img src={item.imgProduct} alt="" />
                <div className=' item_name z-[10]'>{item.name}</div>
              </div>
            )) : 'Can not find this product'}        
              </div>
        </ul>  
        <div className='indicator'></div>          
    </nav>
        <div className="bag">
          <Link to='/cart'>
            <Badge count={data.length}>
                <Avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAV1JREFUSEvtluFRwzAMhfWUAYAJKBNQJqDdoCPABLABjFAmoBvABrQbwAZlgzKA/Tj1DOcmTeL4cpfjiH4lZ1uf9CydBRnIMBBXOoNJnorIpYhMRcS+1wA2XRPoBCa5IPkcgDFrB+AWwGtqAMlg59wjgIcmxwG+SoEngUnOSL4Fh18A7k3i8G9rSxE5sX8AcwA/a7UxJIG99+boWkQMOgWwjT2SnJB8D/C1qs7bsk4F0xyRfCqKwrKtmHNuCeAuZH0GYNd4LW2RxTI3yRgK7yVV7taMO4B/6yDlng/A1qOhiKxH+7Stql7EDsvguHr7BFeqPQX8SXLfmwBuROS8JqLGfWX5U8AbVZ0ZLGqrY+zGfX8K3Mtd52Q8grMUGKVO6eMsacuHRqn/hdRXAGw82ltlEPDe2zxV9wLlFtqHqh688RVwGNgX3vtJLiU+p6o2e63KM1jr6NMH/JiPwcDftpYILoVzxCEAAAAASUVORK5CYII=" />
            </Badge>
          </Link>
        </div>  
    </header>
    </div>
   </Affix>
  )
}

export default ListNavigation