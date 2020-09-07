import React, { Component } from "react";
import {connect} from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../HigerOrderComponents/withErrorHandler/withErrorHandler";
import { fetchOrdersInit } from "../../components/Store/Actions/orderActions";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

    componentDidMount(){
        const token = this.props.token;
        this.props.fetchOrdersInit(token);
    }

    getOrders() {

        if(this.props.orders === null){
            return null;
        }

        return this.props.orders.map((order) => {
            return (<Order key={order.id} ingredients={order.ingredients} price={order.price}/>);
        });
    }

    render() {

        let orders = <Spinner />

        if(!this.props.loading){
            orders = (
                <div>
                    {this.getOrders()}
                </div>
            );
        }

        return(
            orders
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrdersInit: (token) => dispatch(fetchOrdersInit(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));