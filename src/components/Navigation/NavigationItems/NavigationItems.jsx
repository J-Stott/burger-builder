import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>Link1</NavigationItem>
            <NavigationItem link="/">Link2</NavigationItem>
            <NavigationItem link="/">Link3</NavigationItem>
        </ul>
    );
}

export default NavigationItems;