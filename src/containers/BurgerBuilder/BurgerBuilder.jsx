import React, { Component } from "react";
import {connect} from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../HigerOrderComponents/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../components/Store/Actions/burgerActions";
import {orderInit} from "../../components/Store/Actions/orderActions";

class BurgerBuilder extends Component{

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.setIngredients();
    }

    purchasingHandler(){
        this.setState({purchasing: true});
    }

    resetModal(){
        this.setState({purchasing: false});
    }

    purchaseContinueHandler(){
        this.props.orderInit();
        this.props.history.push("/checkout");
    }

    render(){

        let orderSummary = null;
        let burger =  this.props.error ? <p>Cannot load ingredients</p> : <Spinner />;

        if(this.props.ingredients){

            const disabledInfo = {
                ...this.props.ingredients
            }
    
            for(let key in disabledInfo){
                disabledInfo[key] = disabledInfo[key] <= 0;
            }

            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls addHandler={this.props.addIngredient} removeHandler={this.props.removeIngredient} disabled={disabledInfo} purchasable={this.props.totalPrice > 0} price={this.props.totalPrice} click={this.purchasingHandler.bind(this)} />
                </React.Fragment>
            );

            
            orderSummary = <OrderSummary ingredients={this.props.ingredients} price={this.props.totalPrice}
            resetModal={this.resetModal.bind(this)}
            continue={this.purchaseContinueHandler.bind(this)}
            />
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} reset={this.resetModal.bind(this)}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        error: state.burger.error
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        setIngredients: () => dispatch(actionCreators.initIngredients()),
        addIngredient: (type) => dispatch(actionCreators.addIngredient(type)),
        removeIngredient: (type) => dispatch(actionCreators.removeIngredient(type)),
        orderInit: () => {
            dispatch(orderInit());
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));