import React from 'react';
import style from './Sidebar.module.css'
import {NavLink} from "react-router-dom";

let Sidebar = () => {
    return (
        <nav className={style.sidebar}>
                <NavLink to="/profile/" className={style.sidebarLink} activeClassName={style.active}>Профиль</NavLink>
                <NavLink to="/dialogs" className={style.sidebarLink} activeClassName={style.active}>Диалоги</NavLink>
                <NavLink to="/contacts" className={style.sidebarLink} activeClassName={style.active}>Контакты</NavLink>
                <NavLink to="/users" className={style.sidebarLink} activeClassName={style.active}>Пользователи</NavLink>
                <NavLink to="/settings" className={style.sidebarLink} activeClassName={style.active}>Настройки</NavLink>
        </nav>
    )
}

export default Sidebar;