import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER = 'SET_AUTH_USER';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                id: action.id,
                login: action.login,
                email: action.email,
                isAuth: action.isAuth,
            }

        default:
            return state;
    }

}

const setAuthUser = (id, login, email, isAuth) => {
    return {
        type: SET_AUTH_USER,
        id,
        login,
        email,
        isAuth
    }
}

export const getAuthUser = () => (dispatch) => {
    return authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuthUser(id,login, email, true))
        }
    })
}

export const toLogin = (email, password, rememberMe = false) => dispatch => {
    authAPI.login(email, password, rememberMe).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getAuthUser())
        }else{
            let messageError  = response.data.messages.length > 0 ? response.data.messages: "Some error";
            dispatch(stopSubmit('login', {_error : messageError}))
        }
    })
}

export const toLogout = ()=> (dispatch) => {
    authAPI.logout().then(response => {
        if(response.data.resultCode === 0 ) {
            dispatch(setAuthUser(null, null, null, false))
        }
    })
}

export default authReducer;
