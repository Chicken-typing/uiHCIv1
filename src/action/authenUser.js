import { SIGNIN_USER, SIGNOUT_USER, UPDATE_USER } from "../ActionType";

export const login = (data) => {
    return {
        type: SIGNIN_USER,
        payload: data,
    };
};

export const logout = () => {
    return {
        type: SIGNOUT_USER,
    };
};
export const updated = (data) => {
    return {
      type: UPDATE_USER,
      payload: data,
    };
};