import {
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
  CLEAR_SHIPPING_ADDRESS,
} from "../ActionType";

const initialize = {
  shippingAddress: {},
};

const ShippingReducer = (state = initialize, action) => {
  switch (action.type) {
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        shippingAddress: {
          ...state.shippingAddress,
          paymentMethod: action.payload,
        },
      };
    case CLEAR_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: {},
      };
    default:
      return state;
  }
};

export default ShippingReducer;
