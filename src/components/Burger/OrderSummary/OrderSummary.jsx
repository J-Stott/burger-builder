import React, { Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log("Order summary will update");
    }

    render() {

        const summary = Object.keys(this.props.ingredients).map((key) => {
            return <li key={key}><span style={{textTransform: "capitalize"}}>{key}</span>: {this.props.ingredients[key]}</li>
        })

        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {summary}
                </ul>
                <p>Total Price: {this.props.price.toFixed(2)}</p>
                
                <Button btnType="Danger" click={this.props.resetModal}>CANCEL</Button>
                <Button btnType="Success" click={this.props.continue}>CONTINUE</Button>
            </React.Fragment>
        );
    }
}

export default OrderSummary;