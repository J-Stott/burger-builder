import React from "react";
import Input from "./Input";

export function createFormElements(inputConfig, obj, changedHandler){
    const formElementsArray = [];

    for(let key in inputConfig){
        const elementType = inputConfig[key].elementType;
        const config = inputConfig[key].elementConfig;
        const label = inputConfig[key].label;
        const value = inputConfig[key].value;

        let invalid = false;
        let touched = true;
        if("validation" in inputConfig[key]){
            invalid = !inputConfig[key].validation.valid;
            touched = inputConfig[key].validation.touched;
        }
       
        let input = <Input key={key} label={label} elementType={elementType} elementConfig={config} value={value} invalid={invalid} touched={touched} changed={changedHandler.bind(obj, key)}/>

        formElementsArray.push(input);
    }

    return formElementsArray;
}

function checkValidity(value, rules){
    let isValid = true;

    if(rules.required){
        isValid = value.trim() !== "" && isValid;
    }

    return isValid;
}

export function inputChangedHandler(inputName, data, event){

    const formData = {
        ...data
    }

    const updatedFormElement = {...formData[inputName]};

    updatedFormElement.value = event.target.value;

    let valid = true;
    if("validation" in updatedFormElement){
        valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);

        const newValidity = {...updatedFormElement.validation};
        newValidity.valid = valid;
        newValidity.touched = true;
        updatedFormElement.validation = newValidity;
    }
    

    formData[inputName] = updatedFormElement;

    return formData;
}

export function checkFormValid(inputConfig){
    for(let key in inputConfig){

        if("validation" in inputConfig[key]){
            if(!inputConfig[key].validation.valid){
                return false;
            }
        }
    }

    return true;
}