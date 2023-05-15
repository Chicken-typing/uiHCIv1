import { combineReducers } from "redux";
import fetchProductReducer from "./fetchProductReducer";
import fetchReducer from "./fetchReducer";
import fetchStaticReducer from "./fetchStaticReducer";
import fetchOrderReducer from "./fetchOrderReducer";
import fetchAdvertiseReducer from "./fetchAdvertiseReducer";
import CartReducer from "./CartReducer";
import ShippingReducer from "./ShippingReducer"
import fetchUserReducer from "./fetchUserReducer";
import PaymentReducer from "./PaymentReducer";
import userReducer from "./userReducer";
import getPathnameReducer from "./getPathnameReducer";







const rootReducer = combineReducers({
    fetch: fetchReducer,
    fetchProduct: fetchProductReducer,
    fetchStatic: fetchStaticReducer,
    fetchOrder: fetchOrderReducer,
    fetchAdvertise: fetchAdvertiseReducer,
    Cart: CartReducer,
    ShippingInfo: ShippingReducer,
    fetchUser: fetchUserReducer,
    PaymentMethod: PaymentReducer,
    User: userReducer,
    path: getPathnameReducer,
});
export default rootReducer;