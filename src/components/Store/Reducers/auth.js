import * as actionNames from "../Actions/actionTypes";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    }
    
    switch(action.type){
        case(actionNames.AUTH_START):
            console.log("Auth-Start");
            newState.loading = true;
            newState.error = null;
            break;
        case(actionNames.AUTH_SUCCESS):
            console.log("Auth-Success");
            newState.loading = false;
            newState.error = null;
            newState.userId = action.userId;
            newState.token = action.token;
            break;
        case(actionNames.AUTH_FAILED):
            console.log("Auth-Failed");
            newState.loading = false;
            newState.error = action.error;
            break;
        case(actionNames.AUTH_LOGOUT):
            console.log("Auth-Logout");
            newState.token = null;        
            newState.userId = null;
            break;
        default:
            return state;
    }

    return newState;
}

export default reducer;