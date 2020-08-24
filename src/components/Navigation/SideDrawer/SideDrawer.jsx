import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./SideDrawer.module.css";

const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Hide];

    if(props.show){
        attachedClasses = [classes.SideDrawer, classes.Show];
    }

    return (
        <React.Fragment>
            <Backdrop show={props.show} reset={props.reset}/>
            <div className={attachedClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    );
}

export default SideDrawer;