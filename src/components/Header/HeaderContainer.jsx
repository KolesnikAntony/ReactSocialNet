import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {toLogout} from "../../redux/auth-reducer";
import {requestIsAuth, requestLogin} from "../../redux/selectors";


const HeaderContainer = props => {
    return <Header {...props}/>
};

let  mapStateToProps = state => ({
    isAuth : requestIsAuth(state),
    login : requestLogin(state),
})


export default connect(mapStateToProps, {toLogout})(HeaderContainer);