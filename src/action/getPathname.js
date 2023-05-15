import { GET_PATHNAME } from "../ActionType";

export const getPath = data => {
    return {
        type: GET_PATHNAME,
        payload: data,
    }
}