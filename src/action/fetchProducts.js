import { FETCH_API_PRODUCT, FETCH_API_PRODUCT_SUCCESS } from "../ActionType";
import PropTypes from "prop-types";
export const fetchProduct = (params) => {
  return {
    type: FETCH_API_PRODUCT,
    params: {
      ...params,
      pathName: "",
    },
  };
};
export const fetchProductSuccess = (res) => {
  return {
    type: FETCH_API_PRODUCT_SUCCESS,
    payload: {
      data: res,
    },
  };
};
fetchProduct.PropTypes = {
  params: PropTypes.object,
};
