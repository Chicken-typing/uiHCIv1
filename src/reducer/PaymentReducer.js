import { SAVE_PAYMENT_METHOD, CLEAR_PAYMENT_METHOD } from "../ActionType";

const initialize = {
  paymentMethod: "",
};

const PaymentReducer = (state = initialize, action) => {
  switch (action.type) {
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CLEAR_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: "",
      };
    default:
      return state;
  }
};
export default PaymentReducer;
