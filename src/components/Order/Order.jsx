import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {

    const getIngredients = () => {
        let ingredientsArr = [];

        for(let key in props.ingredients){
            ingredientsArr.push(`${key} (${props.ingredients[key]})`);
        }

        return ingredientsArr.join(" ");
    }

    return (
        <div className={classes.Order}>
            <p>Ingredients: {getIngredients()}</p>
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    );
}

export default Order;