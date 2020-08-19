import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 2.0,
    bacon: 1.0
}

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
    }

    updatePurchaseState(ingredients){
        let purchasable = false;
        for(let key in ingredients){
            if(ingredients[key] > 0){
                purchasable = true;
                break;
            }
        }

        //update state here
    }

    addIngredientHandler(type) {
        console.log(type);
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    removeIngredientHandler(type) {
        console.log(type);
        const oldCount = this.state.ingredients[type];

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;

        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <React.Fragment>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls addHandler={this.addIngredientHandler.bind(this)} removeHandler={this.removeIngredientHandler.bind(this)} disabled={disabledInfo} purchasable={this.state.totalPrice > 0} price={this.state.totalPrice}
                />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;