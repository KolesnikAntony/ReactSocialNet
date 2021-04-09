import {APIResponseType, AuthDataType, instance, ResultCodeCaptchaEnum, ResultCodeEnum} from "./api";


export const authAPI = {
    me() {
        return instance.get<APIResponseType<AuthDataType>>('auth/me').then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
        return instance.post<APIResponseType<AuthDataType, ResultCodeCaptchaEnum | ResultCodeEnum >>('auth/login', {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        return instance.delete<APIResponseType>('auth/login').then(res => res.data)
    },

};