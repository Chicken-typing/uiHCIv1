import { FETCH_API_ORDER_SUCCESS, FETCH_API_ORDER } from "../ActionType";
export const fetchOrders = () => {
  return {
    type: FETCH_API_ORDER,
  };
};
export const fetchOrdersSuccess = (res) => {
  return {
    type: FETCH_API_ORDER_SUCCESS,
    payload: res,
  };
};
