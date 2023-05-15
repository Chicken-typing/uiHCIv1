import { ADD_TO_CART, REMOVE_FROM_CART, DELETE_FROM_CART, CLEAR_CART } from "../ActionType";



const initialize = {
    carts: []

};

const CartReducer = (state = initialize, action) => {

    switch (action.type) {

        case ADD_TO_CART:
            const itemIndex = state.carts.findIndex((item) => item._id === action.payload._id && item.size === action.payload.size);
            localStorage.setItem('carts', JSON.stringify(state.carts))
            if (itemIndex >= 0) {
                state.carts[itemIndex].quantity += 1
                return {
                    ...state,
                    carts: [...state.carts]
                }
            } else {
                const temp = {...action.payload, quantity: 1 }
                return {
                    ...state,
                    carts: [...state.carts, temp]
                }
            }

        case REMOVE_FROM_CART:
            const itemIndex_dec = state.carts.findIndex((item) => item._id === action.payload._id && item.size === action.payload.size);
            if (state.carts[itemIndex_dec].quantity >= 1) {
                state.carts[itemIndex_dec].quantity -= 1
                return {
                    ...state,
                    carts: state.carts
                }
            } else if (state.carts[itemIndex_dec].quantity === 1) {
                const data = state.carts.filter((el) => {
                    if (el._id === action.payload._id) {
                        return el.size !== action.payload.size
                    }
                    return el._id !== action.payload._id
                });
                return {
                    ...state,
                    carts: data
                }
            }
            break
        case DELETE_FROM_CART:
            const data = state.carts.filter((el) => {
                if (el._id === action.payload._id) {
                    return el.size !== action.payload.size
                }
                return el._id !== action.payload._id
            });
            return {
                ...state,
                carts: data
            }
        case CLEAR_CART:
            return {
                ...state,
                carts: []
            }
        default:
            return state


    }
}
export default CartReducer