import {Field, reduxForm} from "redux-form";
import React from "react";
import style from "./loginForm.module.css"
import {maxLength, required} from "../../../helpers/validate/validate";
import {Input} from "../../../common/FormControls/FormControls";

let maxLength30 = maxLength(30);

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit} className={style.formLogin}>
        <Field component={Input} name='login' placeholder='Login' validate={[required, maxLength30]}/>
        <Field component={Input} name='password' placeholder='Password' type='password' validate={required} />
        <label htmlFor="rememberMe">Remember me</label>
        <Field component={'input'} name='rememberMe' type='checkbox' id='rememberMe'/>
        {props.error && <p className={style.isError}>{props.error}</p>}
        {props.captchaUrl && <img src={props.captchaUrl} alt="captcha"/>}
        {props.captchaUrl && <Field component={Input} name='captcha'/>}
        <button>Login</button>
    </form>
}

export const LoginFormComponent = reduxForm({form: 'login'})(LoginForm)