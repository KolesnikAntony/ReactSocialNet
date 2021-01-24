import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER = 'SET_AUTH_USER';
const SET_CAPTCHA = 'SET_CAPTCHA';

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
};

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
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
type SetAuthUserActionType = {
    type: typeof SET_AUTH_USER
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
const setAuthUser = (id: number | null, login: string | null , email: string | null, isAuth: boolean):SetAuthUserActionType => ({
    type: SET_AUTH_USER,
    id,
    login,
    email,
    isAuth
});

type SetCaptcha = {
    type: typeof  SET_CAPTCHA
    captchaUrl: string | null
}
const setCaptcha = (captchaUrl: string): SetCaptcha => ({
    type: SET_CAPTCHA,
    captchaUrl
});


export const getAuthUser = () => async (dispatch: any) => {
    return authAPI.me().then((response: any) => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuthUser(id, login, email, true))
        }
    })
};

export const toLogin = (email: string, password: string, rememberMe:boolean = false, captcha: string | null = null) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUser())
    } else {
        if (response.data.resultCode === 10) {
            securityAPI.getCaptcha().then((response: any) => {
                dispatch(setCaptcha(response.data.url))
            })
        }
        let messageError = response.data.messages.length > 0 ? response.data.messages : "Some error";
        dispatch(stopSubmit('login', {_error: messageError}))
    }
};

export const toLogout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUser(null, null, null, false))
        }
};

export default authReducer;
