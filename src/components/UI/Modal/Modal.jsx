import React, {Component} from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
    }

    ShowModal(){
        if(this.props.show){
            return `${classes.Modal} ${classes.Show}`;
        }

        return `${classes.Modal} ${classes.Hide}`;
    }

    render() {
        return (
            <React.Fragment>
            <Backdrop show={this.props.show} reset={this.props.reset}/>
                <div className={this.ShowModal()}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}


export default Modal;