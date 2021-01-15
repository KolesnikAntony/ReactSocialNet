import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {requestIsAuth} from "../redux/selectors";

const mapStateToPropsAuth = state => ({
    isAuth: requestIsAuth(state),
});


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