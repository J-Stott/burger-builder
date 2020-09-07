import * as actionNames from "../Actions/actionTypes";

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 2.0,
    bacon: 1.0
}

const reducer = (state = initialState, action) => {

    const newState = {
        ...state,
    }

    if(state.ingredients !== null){
        newState.ingredients = {
            ...state.ingredients
        }
    }

    console.log(newState);

    switch(action.type){
        case(actionNames.SET_INGREDIENTS):
            newState.ingredients = action.ingredients;
            newState.totalPrice = 0;
            break;
        case(actionNames.SET_INGREDIENTS_FAILED):
            newState.error = true;
            break;
        case(actionNames.ADD_INGREDIENT):
            newState.ingredients[action.ingredientType]++;
            newState.totalPrice += INGREDIENT_PRICES[action.ingredientType];
            break;
        case(actionNames.REMOVE_INGREDIENT):
            newState.ingredients[action.ingredientType]--;
            newState.totalPrice -= INGREDIENT_PRICES[action.ingredientType];
            break;
        default:
            return state;
    }

    return newState;
}

export default reducer;