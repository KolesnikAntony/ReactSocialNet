import React, {FC} from "react";
import {LoginFormComponent} from "./LoginForm/LoginForm";
import {connect} from "react-redux";
import {toLogin} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

export type LoginValueType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

const Login:FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {
    let onSubmit = (formData:LoginValueType)  => {
        let {login, password, rememberMe, captcha} = formData;
        props.toLogin(login, password, rememberMe, captcha);
    };

    if(props.isAuth) {
        return <Redirect to={'./profile'}/>
    }

     return <div>
        <h2>Login</h2>
         <LoginFormComponent onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
     </div>
};

type mapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type mapDispatchToPropsType = {
    toLogin: (email: string,
              password: string,
              rememberMe: boolean,
              captcha: string | null) => void
}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.authTemplate.isAuth,
    captchaUrl: state.authTemplate.captchaUrl,
});

export default connect(mapStateToProps,{toLogin})(Login);