import React, { Component } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

    state = {
        showSideDrawer: false,
    }

    sideDrawerOpenHandler() {
        this.setState({ showSideDrawer: true });
    }

    sideDrawerClosedHandler() {
        this.setState({ showSideDrawer: false });
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar click={this.sideDrawerOpenHandler.bind(this)}/>
                <SideDrawer show={this.state.showSideDrawer} reset={this.sideDrawerClosedHandler.bind(this)}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
       
}

export default Layout;