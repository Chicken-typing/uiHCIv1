import { FETCH_API_PRODUCT, FETCH_API_PRODUCT_SUCCESS } from "../ActionType";
const initialize = {
  products: [],
  error: "",
};
const fetchProductReducer = (state = initialize, action) => {
  switch (action.type) {
    case FETCH_API_PRODUCT:
      return {
        ...state,
      };
    case FETCH_API_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload.data,
      };
    default:
      return state;
  }
};
export default fetchProductReducer;
