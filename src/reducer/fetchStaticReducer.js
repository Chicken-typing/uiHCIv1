import { FETCH_API_STATIC, FETCH_API_STATIC_SUCCESS } from "../ActionType";

const initialize = {
  dataStatistic: {},
};
const fetchStaticReducer = (state = initialize, action) => {
  switch (action.type) {
    case FETCH_API_STATIC:
      return {
        ...state,
      };
    case FETCH_API_STATIC_SUCCESS:
      return {
        ...state,
        dataStatistic: action.payload.dataStatistic,
      };
    default:
      return state;
  }
};
export default fetchStaticReducer;
