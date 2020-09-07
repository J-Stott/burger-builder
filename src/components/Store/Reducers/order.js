import * as actionTypes from "../Actions/actionTypes";

const initialState = {
    orders: null,
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {

    const newState = {
        ...state,
        loading: false,
    }

    if(state.orders !== null){
        newState.orders = [...state.orders];
    }

    switch(action.type){
        case(actionTypes.ORDER_INIT):
            console.log("Order-initialised!");
            newState.purchased = false;
            break;
        case(actionTypes.ORDER_START):
            newState.loading = true;
            break;
        case(actionTypes.ORDER_SUCCESS):
            newState.loading = false;
            console.log("Order-success!");
            newState.purchased = true;
            break;
        case(actionTypes.ORDER_FAILED):
            newState.loading = false;
            break;
        case(actionTypes.FETCH_ORDERS_START):
            newState.loading = true;
            break;
        case(actionTypes.FETCH_ORDERS_SUCCESS):
            newState.orders = action.orders;
            newState.loading = false;
            break;
        case(actionTypes.FETCH_ORDERS_FAILED):
            newState.loading = false;
            break;
        
        default:
            return state;
    }

    return newState;
};



export default reducer;