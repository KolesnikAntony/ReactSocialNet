import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React, {FC} from "react";
import style from "./loginForm.module.css"
import {maxLength, required} from "../../../helpers/validate/validate";
import {createField, Input} from "../../../common/FormControls/FormControls";
import {LoginValueType} from "../login";

let maxLength30 = maxLength(30);
type LoginFormOwnPropsType = {
    captchaUrl: string | null
}

type LoginFormValueTypeKeys = Extract<keyof LoginValueType, string>

const LoginForm: FC<InjectedFormProps<LoginValueType , LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit} className={style.formLogin}>
        {createField<LoginFormValueTypeKeys>("Login", Input, "login", 'text', [required, maxLength30], '')}
        {createField<LoginFormValueTypeKeys>("Password", Input, "password", "password", [required], '')}
        <label htmlFor="rememberMe">Remember me</label>
        {createField<LoginFormValueTypeKeys>(undefined, 'input', "rememberMe", 'checkbox', [], 'rememberMe')}
        {error && <p className={style.isError}>{error}</p>}
        {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
        {captchaUrl && createField<LoginFormValueTypeKeys>(undefined, Input, "captcha", 'text', [], '')}
        <button>Login</button>
    </form>
};

export const LoginFormComponent = reduxForm<LoginValueType , LoginFormOwnPropsType>({form: 'login'})(LoginForm);