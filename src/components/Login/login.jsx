import React from "react";
import {LoginFormComponent} from "./LoginForm/LoginForm";
import {connect} from "react-redux";
import {toLogin} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

const Login =(props)=> {
    let onSubmit = (formData) =>{
        let {login, password, rememberMe} = formData;
        props.toLogin(login, password, rememberMe);
    }

    if(props.isAuth) {
        return <Redirect to={'./profile'}/>
    }

     return <div>
        <h2>Login</h2>
         <LoginFormComponent onSubmit={onSubmit}/>
     </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.authTemplate.isAuth,
})

export default connect(mapStateToProps,{toLogin})(Login);