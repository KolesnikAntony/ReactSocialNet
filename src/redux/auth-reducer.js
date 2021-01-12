import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER = 'SET_AUTH_USER';
const SET_CAPTCHA = 'SET_CAPTCHA';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                id: action.id,
                login: action.login,
                email: action.email,
                isAuth: action.isAuth,

            };
        case SET_CAPTCHA:
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            };

        default:
            return state;
    }

};

const setAuthUser = (id, login, email, isAuth) => ({
    type: SET_AUTH_USER,
    id,
    login,
    email,
    isAuth
});

const setCaptcha = captchaUrl => ({
    type: SET_CAPTCHA,
    captchaUrl
});


export const getAuthUser = () => async dispatch => {
    return authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuthUser(id, login, email, true))
        }
    })
};

export const toLogin = (email, password, rememberMe = false, captcha = null) => async dispatch => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUser())
    } else {
        if (response.data.resultCode === 10) {
            securityAPI.getCaptcha().then(response => {
                dispatch(setCaptcha(response.data.url))
            })
        }
        let messageError = response.data.messages.length > 0 ? response.data.messages : "Some error";
        dispatch(stopSubmit('login', {_error: messageError}))
    }
};

export const toLogout = () => async dispatch => {
    let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUser(null, null, null, false))
        }
};

export default authReducer;
