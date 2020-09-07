import React, { Component } from "react";
import {connect} from "react-redux";

import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import {createFormElements, inputChangedHandler, checkFormValid} from "../../components/UI/Input/InputHelpers";

import Spinner from "../../components/UI/Spinner/Spinner";

import {auth} from "../../components/Store/Actions/authActions"

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: "input",
                label: "Email",
                elementConfig: {
                    type: "email",
                    placeholder: "Email Address"
                },
                value: "",
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                },
            },
            password: {
                elementType: "input",
                label: "Password",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                },
            },
        },
        isSignup: true,
    }

    inputHandler(inputName, event){

        const formData = inputChangedHandler(inputName, this.state.controls, event);

        this.setState({controls: formData});
    }

    submitHandler(event) {
        event.preventDefault();

        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        this.props.onAuth(email, password, this.state.isSignup);
    }

    switchAuthModeHandler() {
        this.setState((prevState) => {
            return {isSignup: !prevState.isSignup}
        });
    }

    render() {

        let errorMessage = null;

        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }

        let form = (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler.bind(this)}>
                    {createFormElements(this.state.controls, this, this.inputHandler)}
                    <Button btnType="Success" disabled={!checkFormValid(this.state.controls)}>Submit</Button>
                </form>

                <Button click={this.switchAuthModeHandler.bind(this)} btnType="Danger">Switch to {this.state.isSignup ? "Sign In" : "Sign Up"}</Button>
             </div>
        );

        if(this.props.loading){
            form = (
                <div className={classes.Auth}>
                    {errorMessage}
                    <Spinner />
                </div>
             );
        }

         return(
            
            form
         );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, signUp) => { dispatch(auth(email, password, signUp)) }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth);