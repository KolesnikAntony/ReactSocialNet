import React from "react";
import {LoginFormComponent} from "./LoginForm/LoginForm";
import {connect} from "react-redux";
import {toLogin} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

const Login =(props)=> {
    let onSubmit = (formData) =>{
        let {login, password, rememberMe, captcha} = formData;
        props.toLogin(login, password, rememberMe, captcha);
    }

    if(props.isAuth) {
        return <Redirect to={'./profile'}/>
    }

     return <div>
        <h2>Login</h2>
         <LoginFormComponent onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
     </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.authTemplate.isAuth,
    captchaUrl: state.authTemplate.captchaUrl,
})

export default connect(mapStateToProps,{toLogin})(Login);