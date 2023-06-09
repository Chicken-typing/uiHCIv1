import React, { useState, useEffect, Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Avatar, Empty } from "antd";
import Tab from "../../components/Tab";
import { AccountCircleOutlined, OpenInNewOutlined } from "@mui/icons-material";
import { logout } from "../../action";
import { SearchOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { fetchProduct } from "../../action";
import { Menu, Transition } from "@headlessui/react";
import { clearShippingAddress, clearPayment } from "../../action";
import { useRef } from "react";
import { Button, Tooltip, Modal, Card, Input } from "antd";
import logo from "../../assets/icons/logo-dark.png";
import _ from "lodash";
import "./style.scss";
const { Meta } = Card;
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ItemSearch = (item, handleClickItem) => {
  return (
    <Card
      style={{
        width: "100%",

        cursor: "pointer",
      }}
      onClick={() => handleClickItem(item._id)}
    >
      <Meta
        avatar={<Avatar src={item.defaultImage.thumbUrl} />}
        title={item.name}
        description={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              color: "GrayText",
            }}
          >
            <DollarCircleOutlined /> &nbsp; {item.price}
          </div>
        }
      />
    </Card>
  );
};

function ListNavigations() {
  const data = useSelector((state) => state.Cart.carts);
  const products = useSelector((state) => state.fetchProduct.products);
  const user = useSelector((state) => state.User.userInfor);
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [scroll, setScroll] = useState(false);
  const wrapperRef = useRef(null);
  const [scrollNav, setScrollNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [cursor, setCursor] = useState(-1);
  let navigate = useNavigate();
  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        if (lastScrollY >= 130) {
          setScrollNav(true);
        }
      } else {
        // if scroll up show the navbar
        setShow(false);
        setKeyword("");
        if (window.scrollY > 45) {
          setScroll(true);
        } else {
          setScroll(false);
        }
        setScrollNav(false);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  // This function to hide the search box when change the orther tab
  useEffect(() => {
    setShow(false);
    setKeyword("");
  }, [pathname]);

  // This function to hide the search box when click any where on the screen
  useEffect(() => {
    function handleClickOutside(event) {
      if (keyword === "") {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setShow(false);
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSearch = (value) => {
    setSearchResult([
      ...products.filter((object) =>
        object.name.toLowerCase().includes(value.toLowerCase())
      ),
    ]);
  };

  // Use this function to press Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setKeyword(event.target.value);
      event.target.value = "";
    }
    if (event.key === "ArrowDown") {
      show
        ? setCursor((C) => (C < searchResult.length - 1 ? C + 1 : C))
        : setShow(true);
    }
    if (event.key === "ArrowUp") {
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }
    if (event.key === "Escape") {
      setShow(false);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);
  const handleClose = () => {
    setShow(false);
  };
  const style = {
    backgroundColor: "transparent",
    color: "white",
    border: 0,
    cursor: "default",
  };
  const handleClickItem = (id) => navigate(`/products/${id}`);
  return (
    <>
      <Disclosure
        as="nav"
        className={`scroll bg-black max-w-[100%] ${scrollNav && "hidden"} `}
        style={{ top: scroll ? "0" : "", position: scroll ? "fixed" : "" }}
      >
        {({ open }) => (
          <>
            <div className=" px-3 sm:px-6 lg:px-7">
              <div className="relative flex items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center nmd:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <span
                  className="md:w-[80px] md:h-[80px] w-[60px] h-[60px] md:static absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] md:translate-x-0 md:translate-y-0 "
                  onClick={() => navigate("/")}
                >
                  <img src={logo} alt="Brand Logo" className="h-full w-full" />
                </span>

                <div className="flex items-center justify-between sm:items-stretch sm:justify-start max-w-[100%] ">
                  <div className="">
                    <div className="flex  m-sm:invisible gap-[16px] max-w-[100%]">
                      <Tab label="Home" url="/home" />
                      <Tab label="Woman" url="/woman" />
                      <Tab label="Man" url="/man" />
                      <Tab label="Kid" url="/kid" />
                      <Tab label="Brand" url="/brand" />
                      <li className="search-engine m-sm:hidden">
                        <Tooltip title="search">
                          <Button
                            id="search-icon"
                            shape="circle"
                            icon={<SearchOutlined />}
                            size="large"
                            onClick={() => setShow(!show)}
                            style={{ top: "-5px" }}
                          />
                        </Tooltip>
                      </li>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-[8px] ">
                  <Link className="" to="/cart">
                    <Badge count={data.length} size="small">
                      <Avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAV1JREFUSEvtluFRwzAMhfWUAYAJKBNQJqDdoCPABLABjFAmoBvABrQbwAZlgzKA/Tj1DOcmTeL4cpfjiH4lZ1uf9CydBRnIMBBXOoNJnorIpYhMRcS+1wA2XRPoBCa5IPkcgDFrB+AWwGtqAMlg59wjgIcmxwG+SoEngUnOSL4Fh18A7k3i8G9rSxE5sX8AcwA/a7UxJIG99+boWkQMOgWwjT2SnJB8D/C1qs7bsk4F0xyRfCqKwrKtmHNuCeAuZH0GYNd4LW2RxTI3yRgK7yVV7taMO4B/6yDlng/A1qOhiKxH+7Stql7EDsvguHr7BFeqPQX8SXLfmwBuROS8JqLGfWX5U8AbVZ0ZLGqrY+zGfX8K3Mtd52Q8grMUGKVO6eMsacuHRqn/hdRXAGw82ltlEPDe2zxV9wLlFtqHqh688RVwGNgX3vtJLiU+p6o2e63KM1jr6NMH/JiPwcDftpYILoVzxCEAAAAASUVORK5CYII=" />
                    </Badge>
                  </Link>

                  <Menu as="div" className="relative text-black ">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <Avatar
                          icon={<AccountCircleOutlined />}
                          size={32}
                          shape="circle"
                          style={{ color: "black", backgroundColor: "white" }}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute p-[8px] right-0 z-[100] mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-center"
                        id="custom"
                      >
                        {!user.token ? (
                          <>
                            <Menu.Item>
                              <div
                                className="py-[8px] font-bold text-white bg-black rounded-md border-[1px] border-solid border-black cursor-pointer"
                                onClick={() => {
                                  navigate("/register");
                                }}
                              >
                                Sign Up
                              </div>
                            </Menu.Item>
                            <Menu.Item>
                              <div
                                className="py-[8px] font-bold text-black cursor-pointer "
                                onClick={() => {
                                  navigate("/login");
                                }}
                              >
                                Sign In
                              </div>
                            </Menu.Item>
                          </>
                        ) : (
                          <>
                            <Menu.Item>
                              <div className="block px-4 py-2 text-sm text-gray-700 cursor-pointer font-medium">
                                {user.username}
                              </div>
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  )}
                                  onClick={() => {
                                    navigate(`/${user._id}/account`);
                                  }}
                                >
                                  Your Profile
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? "bg-gray-100  text-red-danger"
                                      : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  )}
                                  onClick={() => {
                                    dispatch(logout());
                                    dispatch(clearShippingAddress());
                                    dispatch(clearPayment());
                                    navigate("/");
                                  }}
                                >
                                  Sign out
                                </div>
                              )}
                            </Menu.Item>
                            {user.role !== "customer" ? (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    className={classNames(
                                      active ? "bg-gray-100 text-blue-500" : "",
                                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                    )}
                                    onClick={() => {
                                      navigate("/admin");
                                    }}
                                  >
                                    Go to admin <OpenInNewOutlined />
                                  </div>
                                )}
                              </Menu.Item>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="nmd:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 relative">
                <Tab label="Home" url="/home" />
                <Tab label="Woman" url="/woman" />
                <Tab label="Man" url="/man" />
                <Tab label="Kid" url="/kid" />
                <Tab label="Brand" url="/brand" />
                <li className="search-engine">
                  <Tooltip title="search">
                    <Button
                      id="search-icon"
                      shape="circle"
                      icon={<SearchOutlined />}
                      size="large"
                      onClick={() => setShow(!show)}
                      style={{ top: "-5px" }}
                    />
                  </Tooltip>
                </li>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Modal
        title="Search Box"
        width={400}
        open={show}
        onOk={handleClose}
        closable={false}
        okText="Close"
        cancelButtonProps={{
          style: style,
        }}
        destroyOnClose
        afterClose={() => setSearchResult(products)}
      >
        <Input
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search product..."
          style={{ paddingLeft: 10, marginBottom: 20 }}
        />
        <div className="result-list">
          {_.isEmpty(searchResult) ? (
            <Empty />
          ) : (
            <>{searchResult.map((item) => ItemSearch(item, handleClickItem))}</>
          )}
        </div>
      </Modal>
    </>
  );
}

export default ListNavigations;
