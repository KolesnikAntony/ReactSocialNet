import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {toLogout} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component{



    render() {
        return <Header {...this.props}/>
    }
}

let  mapStateToProps = (state) => {
    return{
        isAuth : state.authTemplate.isAuth,
        login : state.authTemplate.login,
    }
}
export default connect(mapStateToProps, {toLogout})(HeaderContainer);