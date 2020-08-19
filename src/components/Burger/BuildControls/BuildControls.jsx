import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"},
]

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: {props.price.toFixed(2)}</p>
            {controls.map((control) => {
                return <BuildControl key={control.label} label={control.label} add={() => { props.addHandler(control.type)}} remove={() => {props.removeHandler(control.type)}}
                disabled={props.disabled[control.type]} />
            })}
            <button className={classes.OrderButton} disabled={!props.purchasable}>Order Burger</button>
        </div>
    );
}

export default BuildControls;