import { GET_PATHNAME } from "../ActionType";

const initialize = {
    pathname: ""
};

const getPathnameReducer = (state = initialize, action) => {

    switch (action.type) {

        case GET_PATHNAME:
            return {
                ...state,
                pathname: action.payload
            }

        default:
            return state


    }
}
export default getPathnameReducer