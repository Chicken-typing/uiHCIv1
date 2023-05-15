import { ADD_TO_CART, REMOVE_FROM_CART, DELETE_FROM_CART, CLEAR_CART } from "../ActionType";

export const addToCart = (data) => {
    return {
        type: ADD_TO_CART,
        payload: data,

    };
}

export const removeFromCart = (data) => {
    return {
        type: REMOVE_FROM_CART,
        payload: data,
    }
}

export const deleteFromCart = id => {
    return {
        type: DELETE_FROM_CART,
        payload: id,
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}