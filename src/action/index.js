import { fetchAPI, fetchAPISuccess, fetchAPIFailure } from "./fetch";
import { fetchProduct, fetchProductSuccess } from "./fetchProducts";
import { fetchOrders, fetchOrdersSuccess } from "./fetchOrders";
import { fetchStatic, fetchStaticSuccess } from "./fetchStatic";
import { addToCart, removeFromCart, deleteFromCart } from "./Cart";
import { savePaymentMethod, saveShippingAddress } from "./Shipping";
import { fetchUser, fetchUserSuccess } from "./fetchUser";
import { login, logout } from "./authenUser";
import { getPath } from "./getPathname";
import { clearCart } from "./Cart";
import { clearPayment, clearShippingAddress } from "./Shipping";
export {

    fetchAPI,
    fetchAPISuccess,
    fetchAPIFailure,
    fetchProduct,
    fetchProductSuccess,
    fetchStatic,
    fetchStaticSuccess,
    fetchOrders,
    fetchOrdersSuccess,
    addToCart,
    removeFromCart,
    deleteFromCart,
    savePaymentMethod,
    saveShippingAddress,
    fetchUser,
    fetchUserSuccess,
    login,
    logout,
    getPath,
    clearCart,
    clearShippingAddress,
    clearPayment,
};

