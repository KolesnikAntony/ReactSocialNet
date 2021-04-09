import axios from "axios";


export const instance = axios.create(
    {
        withCredentials: true,
        headers: {
            'API-KEY': '40c8c4c0-bb4d-4239-bc96-756eb81d3261'
        },
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    }
);



export enum ResultCodeEnum{
    Success = 0,
    Error = 1
}
export enum ResultCodeCaptchaEnum{
    Captcha = 10
}
export type AuthDataType ={
    id: number
    email: string
    login: string
}

export type CaptchaDataType = {
        url: string
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}