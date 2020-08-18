import React from "react";
import classes from "./layout.module.css";

const Layout = (props) => {
    return(
        <React.Fragment>
            <div>
                Toolbar, sidedrawer, backdrop
            </div>
            <main className={classes.content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default Layout;