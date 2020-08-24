import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {

    const showModal = function(){
        if(props.show){
            return `${classes.Modal} ${classes.Show}`;
        }

        return `${classes.Modal} ${classes.Hide}`;
    }

    return (
        <React.Fragment>
        <Backdrop show={props.show} reset={props.reset}/>
            <div className={showModal()}>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default Modal;