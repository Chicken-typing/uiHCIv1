import { FETCH_API, FETCH_API_SUCCESS, FETCH_API_FAILURE } from "../ActionType";
const initialize = {
  data: [],
  error: "",
};
const fetchReducer = (state = initialize, action) => {
  switch (action.type) {
    case FETCH_API:
      return {
        ...state,
      };
    case FETCH_API_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case FETCH_API_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
export default fetchReducer;
