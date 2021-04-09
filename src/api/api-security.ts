import {APIResponseType, CaptchaDataType, instance, ResultCodeCaptchaEnum, ResultCodeEnum} from "./api";

export const securityAPI = {
    getCaptcha() {
        return instance.get<APIResponseType<CaptchaDataType, ResultCodeEnum | ResultCodeCaptchaEnum
            >>('security/get-captcha-url').then(res => res.data)
    },
};