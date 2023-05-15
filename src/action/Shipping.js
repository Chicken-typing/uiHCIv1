import { SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD, CLEAR_SHIPPING_ADDRESS, CLEAR_PAYMENT_METHOD } from "../ActionType";

export const saveShippingAddress = (shippingAddress) => {


    return {
        type: SAVE_SHIPPING_ADDRESS,
        payload: shippingAddress
    };
}

export const savePaymentMethod = (type) => {
    return {
        type: SAVE_PAYMENT_METHOD,
        payload: type
    }
}

export const clearShippingAddress = () => {
    return {
        type: CLEAR_SHIPPING_ADDRESS
    }
}

export const clearPayment = () => {
    return {
        type: CLEAR_PAYMENT_METHOD
    }
}