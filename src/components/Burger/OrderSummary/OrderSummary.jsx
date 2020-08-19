import React from "react";

const OrderSummary = (props) => {

    const summary = Object.keys(props.ingredients).map((key) => {
        return <li key={key}><span style={{textTransform: "capitalize"}}>{key}</span>: {props.ingredients[key]}</li>
    })

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {summary}
            </ul>
            <p>Total Price: {props.price.toFixed(2)}</p>
        </React.Fragment>
    );
}

export default OrderSummary;