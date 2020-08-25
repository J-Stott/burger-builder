import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../HigerOrderComponents/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 2.0,
    bacon: 1.0
}

class BurgerBuilder extends Component{

    state = {
        ingredients: null,
        totalPrice: 0,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get("https://burger-builder-d4b37.firebaseio.com/ingredients.json")
        .then((response) => {
            console.log("State set!");
            console.log(response.data);
            this.setState({ingredients: response.data});
        })
        .catch((err) => {
            console.log(err);
            this.setState({error: true});
        });
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

    purchasingHandler(){
        this.setState({purchasing: true});
    }

    resetModal(){
        this.setState({purchasing: false});
    }

    purchaseContinueHandler(){
        //alert("You have continued!");
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Stott",
                address: {
                    street: "1 Test Street",
                    zipCode: "11111",
                    country: "UK"
                },
                email: "test@email.com"
            },
            deliveryMethod: "fastest"
        };

        axios.post("/orders.json", order)
            .then((response) => {
                this.setState({loading: false, purchasing: false});
                console.log(response);
            })
            .catch((error) => {
                this.setState({loading: false, purchasing: false});
                console.log(error);
            })
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

        let orderSummary = null;
        let burger =  this.state.error ? <p>Cannot load ingredients</p> : <Spinner />;

        if(this.state.ingredients){
            console.log("Burger stuff");

            const disabledInfo = {
                ...this.state.ingredients
            }
    
            for(let key in disabledInfo){
                disabledInfo[key] = disabledInfo[key] <= 0;
            }

            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls addHandler={this.addIngredientHandler.bind(this)} removeHandler={this.removeIngredientHandler.bind(this)} disabled={disabledInfo} purchasable={this.state.totalPrice > 0} price={this.state.totalPrice} click={this.purchasingHandler.bind(this)} />
                </React.Fragment>
            );

            
            orderSummary = <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice}
            resetModal={this.resetModal.bind(this)}
            continue={this.purchaseContinueHandler.bind(this)}
            />
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);