import React from 'react';
import style from './Header.module.css'
import {NavLink} from "react-router-dom";


const Header = (props) => {
    let logout = () => {
        props.toLogout();
    }

    return (<header className={style.header}>
        <img className={style.img} src="https://www.besplatnyeprogrammy.ru/wp-content/uploads/anydesk.png" alt="logo"/>
        <div>{
            props.isAuth
                ?<div className={style.isAuth}>
                    <span>{props.login}</span>
                    <span>-</span>
                    <button onClick={logout}>Log out</button>
                </div>
                : <NavLink to={`/login`}>Войти</NavLink>
        }</div>
    </header>)
}

export default Header;