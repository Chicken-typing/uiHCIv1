import { SIGNIN_USER, SIGNOUT_USER, UPDATE_USER } from "../ActionType";

const initialize = {
  userInfor: {
    email: "",
    role: "",
    token: "",
    username: "",
    _id: "",
    birthday: "",
    phone: "",
    address:'',
  },
};
const userReducer = (state = initialize, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return {
        ...state,
        userInfor: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        userInfor: {
          ...state.userInfor,
          ...action.payload
        },
      };
    case SIGNOUT_USER:
      return {
        ...state,
        userInfor: {},
      };
    default:
      return state;
  }
};
export default userReducer;
