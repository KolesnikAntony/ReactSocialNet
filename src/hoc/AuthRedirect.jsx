import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsAuth = (state) => {
    return {
        isAuth: state.authTemplate.isAuth,
    }
}


const withAuthRedirect = (Component) => {

    class AuthRedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth) return <Redirect to={'/login'}/>;
            return <Component {...this.props}/>
        }

    }
    let AuthRedirect = connect(mapStateToPropsAuth)(AuthRedirectComponent);
    return AuthRedirect
}

export default withAuthRedirect;