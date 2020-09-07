import * as actionTypes from "./actionTypes";
import axios from "../../../axios-orders";

const orderSuccess = (id, orderData) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const orderFailed = (error) => {
    return {
        type: actionTypes.ORDER_FAILED,
        error: error
    }
}

const orderStart = () => {
    return {
        type: actionTypes.ORDER_START,
    }
}

export const purchaseStart = (orderData) => {
    return (dispatch) => {
        dispatch(orderStart());

        axios.post("/orders.json", orderData)
        .then((response) => {
            dispatch(orderSuccess(response.data.name, orderData));
        })
        .catch((error) => {
            dispatch(orderFailed(error));
        });
    }
}

export const orderInit = () => {
    return {
        type: actionTypes.ORDER_INIT,
    }
}

export const fetchOrdersInit = (token) => {
    return (dispatch) => {

        dispatch(fetchOrdersStart());

        axios.get(`/orders.json?auth=${token}`)
            .then((res) => {
                const fetchedOrders = [];
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch((err) => {
                dispatch(fetchOrdersFailed(err));
            }); 
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: fetchedOrders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}