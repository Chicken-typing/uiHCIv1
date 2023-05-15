import { FETCH_API_ADVERTISE, FETCH_API_ADVERTISE_SUCCESS } from "../ActionType";

export const fetchAdvertise = () => {
    return {
        type: FETCH_API_ADVERTISE,
    };
};

export const fetchAdvertiseSuccess = (res) => {
    return {
        type: FETCH_API_ADVERTISE_SUCCESS,
        payload: {
            data: res,
        },
    };
};