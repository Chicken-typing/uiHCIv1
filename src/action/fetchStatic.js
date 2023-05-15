import { FETCH_API_STATIC, FETCH_API_STATIC_SUCCESS } from "../ActionType";

export const fetchStatic = (params) => {
  return {
    type: FETCH_API_STATIC,
    params,
  };
};
export const fetchStaticSuccess = (res) => {
  return {
    type: FETCH_API_STATIC_SUCCESS,
    payload: {
      dataStatistic: res,
    },
  };
};
