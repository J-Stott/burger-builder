import React, { Component } from "react";
import {connect} from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../HigerOrderComponents/withErrorHandler/withErrorHandler";
import { purchaseStart } from "../../../components/Store/Actions/orderActions";
import {createFormElements, inputChangedHandler, checkFormValid} from "../../../components/UI/Input/InputHelpers"

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: "input",
                label: "Name",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                },
            },
            email: {
                elementType: "input",
                label: "Email Address",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email"
                },
                value: "",
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                }
            },
            street: {
                elementType: "input",
                label: "Street Address",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Address"
                },
                value: "",
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                }
            },
            postCode: {
                elementType: "input",
                label: "Post Code",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Post Code"
                },
                value: "",
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                }
            },
            deliveryMethod: {
                elementType: "select",
                label: "Delivery Method",
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "fastest"}, 
                        {value: "cheapest", displayValue: "cheapest"}, 
                    ]
                },
                value: "fastest"
            },
        },
    }

    orderHandler(event) {
        //stops reloading of page
        event.preventDefault();

        if(checkFormValid(this.state.orderForm)){
            const formData = this.getFormData();
            console.log(formData);

            const order = {
                ingredients: this.props.ingredients,
                price: this.props.totalPrice,
                orderData: formData
            };

            this.props.orderBurger(order);
        }
    }

    inputHandler(inputName, event){

        const formData = inputChangedHandler(inputName, this.state.orderForm, event);

        this.setState({orderForm: formData});
    }

    getFormData() {

        const formData = {};

        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }

        return formData;
    }

    render() {

        let form = (
            <form onSubmit={this.orderHandler.bind(this)}>
                {createFormElements(this.state.orderForm, this, this.inputHandler)}
                <Button btnType="Success" disabled={!checkFormValid(this.state.orderForm)}>Order!</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        orderBurger: (orderData) => {
            return dispatch(purchaseStart(orderData));
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));