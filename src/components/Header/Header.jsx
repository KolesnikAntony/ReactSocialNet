import React from 'react';
import style from './Header.module.css'
import {NavLink} from "react-router-dom";
import {requestIsAuth, requestLogin} from "../../redux/selectors";
import {connect} from "react-redux";
import {toLogout} from "../../redux/auth-reducer";


const Header = ({toLogout, isAuth, login}) => {
    const onLogout = () => {
        toLogout();
    };

    return (
        <header className={style.header}>
            <img className={style.img} src="https://www.besplatnyeprogrammy.ru/wp-content/uploads/anydesk.png"
                 alt="logo"/>
            <div>
                {
                    isAuth ? <div className={style.isAuth}>
                            <span>{login}</span>
                            <span>-</span>
                            <button onClick={onLogout}>Log out</button>
                        </div>
                        : <NavLink to={`/login`}>Войти</NavLink>
                }
            </div>
        </header>)
};


let  mapStateToProps = state => ({
    isAuth : requestIsAuth(state),
    login : requestLogin(state),
});


export default connect(mapStateToProps, {toLogout})(Header);
