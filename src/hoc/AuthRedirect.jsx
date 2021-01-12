import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsAuth = state => {
    return {
        isAuth: state.authTemplate.isAuth,
    }
};


const withAuthRedirect = Component => {

    class AuthRedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth) return <Redirect to={'/login'}/>;
            return <Component {...this.props}/>
        }

    }
    return connect(mapStateToPropsAuth)(AuthRedirectComponent);
};

export default withAuthRedirect;