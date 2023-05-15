import {
  FETCH_API_ADVERTISE,
  FETCH_API_ADVERTISE_SUCCESS,
} from "../ActionType";
const initialize = {
  products: [],
  error: "",
};
const fetchAdvertiseReducer = (state = initialize, action) => {
  switch (action.type) {
    case FETCH_API_ADVERTISE:
      return {
        ...state,
      };
    case FETCH_API_ADVERTISE_SUCCESS:
      return {
        ...state,
        products: action.payload.data,
      };
    default:
      return state;
  }
};
export default fetchAdvertiseReducer;
