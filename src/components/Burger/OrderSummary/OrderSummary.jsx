import React from "react";
import Button from "../../UI/Button/Button";

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
            
            <Button btnType="Danger" click={props.resetModal}>CANCEL</Button>
            <Button btnType="Success" click={props.continue}>CONTINUE</Button>
        </React.Fragment>
    );
}

export default OrderSummary;