import React from 'react';
import style from './Header.module.css'
import {NavLink} from "react-router-dom";


const Header = ({toLogout, isAuth, login}) => {
    const onLogout = () => {
        toLogout();
    };

    return (
        <header className={style.header}>
            <img className={style.img} src="https://www.besplatnyeprogrammy.ru/wp-content/uploads/anydesk.png"
                 alt="logo"/>
            <div>
                {isAuth ? <div className={style.isAuth}>
                            <span>{login}</span>
                            <span>-</span>
                            <button onClick={onLogout}>Log out</button>
                        </div>
                        : <NavLink to={`/login`}>Войти</NavLink>
                }
            </div>
        </header>)
}

export default Header;