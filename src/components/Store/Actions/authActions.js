import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,

    }
}

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, signUp) => {
    return (dispatch) => {
        dispatch(authStart());

        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_KEY}`;

        if(!signUp){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_KEY}`;
        }

        axios.post(url, data).then((response) => {
            console.log(response);
            const token = response.data.idToken;
            const userId = response.data.localId;
            const expires = response.data.expiresIn;
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout(expires));
        })
        .catch((err) => {
            dispatch(authFail(err.response.data.error));
        })
    }
}

