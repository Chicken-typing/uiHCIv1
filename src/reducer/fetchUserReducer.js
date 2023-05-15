import { FETCH_USER, FETCH_USER_SUCCESS } from "../ActionType";
const initialize = { dataUser: [] };
const fetchUserReducer = (state = initialize, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {...state };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                dataUser: action.payload,
            };
        default:
            return state ;
    }
};
export default fetchUserReducer;