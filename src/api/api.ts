import axios from "axios";
import {UserProfileType} from "../Types/types";
import {stringify} from "querystring";

const instance = axios.create(
    {
        withCredentials: true,
        headers: {
            'API-KEY': '40c8c4c0-bb4d-4239-bc96-756eb81d3261'
        },
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    }
);

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    unfollow(userId:number){
        return instance.delete(`follow/${userId}`)
    },
    follow(userId: number){
        return instance.post(`follow/${userId}`)
    },

};

export const profileAPI = {
    getProfile(userId:number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId:number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {
          status: status
        })
    },
    updatePhoto(photo: any) {
        let formData = new FormData();
        formData.append("image", photo);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfile(profileData: UserProfileType) {
        return instance.put(`profile`, profileData )
    }
};


export enum ResultCodeEnum{
    Success = 0,
    Error = 1
}
export enum ResultCodeCaptchaEnum{
    Captcha = 10
}

type MeType = {
    data: {
        id: number,
        email: string,
        login: string,
    },
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type CaptchaType = {
    data: {
        url: string
    },
    resultCode: ResultCodeEnum | ResultCodeCaptchaEnum
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeType>('auth/me').then(res => res.data)
    },
    login(email: string, password:string, rememberMe: boolean, captcha: string | null) {
        return instance.post('auth/login', {email, password, rememberMe,captcha})
    },
    logout() {
        return instance.delete('auth/login')
    },

};

export const securityAPI = {
    getCaptcha() {
        return instance.get<CaptchaType>('security/get-captcha-url').then(res => res.data)
    },
};