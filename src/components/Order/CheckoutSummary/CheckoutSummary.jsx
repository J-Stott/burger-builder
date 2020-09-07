import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button"
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes good!</h1>
            <div className={classes.BurgerContainer}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" click={props.cancel}>Cancel</Button>
            <Button btnType="Success" click={props.confirm}>Continue</Button>
        </div>
    )
}

export default CheckoutSummary;