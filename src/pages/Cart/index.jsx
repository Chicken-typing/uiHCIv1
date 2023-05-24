import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteFromCart,
  removeFromCart,
  clearCart,
} from "../../action";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Empty, notification, Button } from "antd";
import { getPath } from "../../action";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  // UseState
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [ship, setShip] = useState(0);
  const token = useSelector((state) => state.User.userInfor);
  // Function
  const navigate = useNavigate();
  const history = useNavigate();
  const handleAdd = (e) => {
    dispatch(addToCart(e));
  };
  const handleDel = (e) => {
    dispatch(removeFromCart(e));
    history("/cart");
  };

  const handleDelAll = (item) => {
    dispatch(deleteFromCart(item));
  };

  const dispatch = useDispatch();
  const data = useSelector((state) => state.Cart.carts);
  const subTotal = () => {
    let price = 0;
    data.map((item) => (price += item.price * item.quantity));
    return price;
  };

  const totalAll = () => {
    let price = 0;
    if (data.length === 0) {
      setShip(0);
      setTotal(0);
    } else {
      setShip(14);

      data.map((item) => (price += item.price * item.quantity));
    }
    return price + ship;
  };

  const location = useLocation().pathname.split("/");
  dispatch(getPath(location[1]));
  useEffect(() => {
    setPrice(subTotal());
    setTotal(totalAll());
  });

  const notify = () => toast("Cart is empty");

  const loginNotify = () => {
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          navigate("/login");
          notification.close();
        }}
      >
        Click here!
      </Button>
    );
    notification.open({
      message: "Please log in to checkout!",
      btn,
      duration: 2,
    });
  };

  return (
    <div className="py-14 px-10">
      <div className="font-[800] text-gray-900 text-2xl">Shopping Cart</div>
      <div className="mx-auto max-w-2xl px-4  pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3  lg:gap-x-10   lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:col-span-1 lg:mt-0">
          <form className="" onSubmit={(e) => e.preventDefault()}>
            {/* Colors */}

            <div className="bg-gray-bg w-[100%] lg:w-[100%] h-[100%] px-2 lg:px-4 lg:py-4 lg:max-h[50%]  rounded-xl">
              <p className="font-[600] text-gray-800 text-xl">Order Summary</p>

              {/* SubTotal */}
              <div className="flex w-[100%] ">
                <div className="flex-1 text-gray-600 text-lg">Subtotal</div>
                <div className="flex-1 text-end text-lg text-gray-800 font-[400] lg:py-[2px]">{`$${price}`}</div>
              </div>
              <div className="mt-3 mb-3 lg:border-t lg:border-gray-400  "></div>

              {/* Shipping Cost   */}
              <div className="flex w-[100%]">
                <div className="flex-1 text-gray-600 text-lg">
                  Shipping Cost
                </div>
                <div className="flex-1 text-end text-lg text-gray-800 font-[400] lg:py-[2px]">{`$${ship}`}</div>
              </div>
              <div className="mt-3 mb-3 lg:border-t lg:border-gray-400 "></div>

              {/* Total   */}
              <div className="flex w-[100%]">
                <div className="flex-1 font-[600] text-gray-800 text-lg">
                  Order Total
                </div>
                <div className="flex-1 text-end text-lg text-gray-800 font-[400] lg:py-[2px]">{`$${total}`}</div>
              </div>

              {/* Checkout  */}
              <button
                className="w-[100%] bg-indigo-600 text-white lg:mt-5 items-center justify-center rounded-md border border-transparent hover:bg-indigo-700
                  focus:outline-none focus:ring-2  focus:ring-indigo-500 focus:ring-offset-2 lg:p-4"
                onClick={() =>
                  data.length === 0
                    ? notify()
                    : token.token
                    ? navigate("/checkout/shippingAddress")
                    : loginNotify()
                }
              >
                Checkout
              </button>
              <ToastContainer position="bottom-right" />
            </div>
          </form>
        </div>

        {data.length === 0 ? (
          <div className="lg:col-span-2 lg:mt-8">
            <Empty />
          </div>
        ) : (
          <div className="lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200  flex flex-col gap-[24px]">
            <Button
              danger
              type="link"
              onClick={() => dispatch(clearCart())}
              style={{
                alignSelf: "flex-end",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Clear
            </Button>

            <div className="flex flex-col gap-[16px] w-full">
              {data.map((item) => (
                <div className=" w-full   " key={item._id + item.size}>
                  <div className="flex w-[100%] gap-[16px] m-sm:flex-col">
                    {/* <img src={item.imgProduct !== undefined && item.imgProduct} alt="" 
            className=' lg:h-[85%] lg:w-[35%] rounded-2xl mt-1 min-[370px]:h-[120px] min-[370px]:w-[100px] : '/> */}
                    <div className="flex flex-1 gap-[8px]">
                      <img
                        src={item.defaultImage.thumbUrl}
                        alt="image product"
                        className=" w-[200px] h-[200px] object-contain"
                      />
                      <div className="  flex-1 flex flex-col gap-[4px]  ">
                        <div className=" lg:max-w-[100%] lg:break-all font-[700]  text-lg">
                          {item.name}
                        </div>
                        {/* Color and Size */}
                        <div className="flex gap-[24px]">
                          <div className="text-gray-500  ">Green</div>
                          <div className="text-gray-500  ">{`Size ${item.size}`}</div>
                        </div>
                        {/* Cost */}
                        <div className="text-[20px] font-[600]">{`$${item.price}`}</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-[8px] item-center   ">
                      <span className="font-[500] text-lg text-center ">
                        Quantity
                      </span>
                      <div className="flex justify-center items-center gap-[8px]">
                        <button
                          className="text-[20px] p-[8px]"
                          onClick={
                            item.quantity <= 1
                              ? () => handleDelAll(item)
                              : () => handleDel(item)
                          }
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
                              d="M19.5 12h-15"
                            />
                          </svg>
                        </button>
                        <span className="text-[24px]">{item.quantity}</span>
                        <button
                          className="text-[20px] p-[8px] "
                          onClick={() => handleAdd(item)}
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
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Remove item */}
                    <Button type="text" onClick={() => handleDelAll(item)}>
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
