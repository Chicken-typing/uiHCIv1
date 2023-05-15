import { FETCH_API_ORDER, FETCH_API_ORDER_SUCCESS } from "../ActionType";
const initialize = { dataOrder: [], error: "" };
const fetchOrderReducer = (state = initialize, action) => {
  switch (action.type) {
    case FETCH_API_ORDER:
      return {
        ...state,
      };
    case FETCH_API_ORDER_SUCCESS: {
      return {
        ...state,
        dataOrder: action.payload,
      };
    }
    default:
      return state;
  }
};
export default fetchOrderReducer;
