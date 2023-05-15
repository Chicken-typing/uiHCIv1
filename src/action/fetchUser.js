import { FETCH_USER, FETCH_USER_SUCCESS } from "../ActionType";
export const fetchUser = () => {
  return {
    type: FETCH_USER,
  };
};
export const fetchUserSuccess = (res) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: res,
  };
};
