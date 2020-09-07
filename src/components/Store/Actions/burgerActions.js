import * as actionTypes from "./actionTypes";
import axios from "../../../axios-orders";

export const addIngredient = (ingredientType) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: ingredientType
    }
}

export const removeIngredient = (ingredientType) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: ingredientType
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: {
            salad: ingredients.salad,
            bacon: ingredients.bacon,
            cheese: ingredients.cheese,
            meat: ingredients.meat
        }
    }
}

const setError = () => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED,
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        axios.get("https://burger-builder-d4b37.firebaseio.com/ingredients.json")
        .then((response) => {
            dispatch(setIngredients(response.data))
        })
        .catch((err) => {
            console.log(err);
            dispatch(setError());
        });
    }
}


