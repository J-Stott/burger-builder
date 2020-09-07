import React, { Component } from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";


class Checkout extends Component {

    checkoutCancelledHandler(){
        this.props.history.goBack();
    }

    checkoutConfirmedHandler(){
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        let jsx = (<Redirect to="/" />);

        if(!this.props.purchased && this.props.ingredients) {

            jsx = (<div>
                <CheckoutSummary ingredients={this.props.ingredients}
                    cancel={this.checkoutCancelledHandler.bind(this)} confirm={this.checkoutConfirmedHandler.bind(this)}
                />
                <Route path={this.props.match.url + "/contact-data"} component={ContactData} />
            </div>);
        }

        return(
            jsx
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);