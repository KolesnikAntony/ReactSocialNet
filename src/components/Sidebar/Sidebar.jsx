import React from 'react';
import style from './Sidebar.module.css'
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <nav className={style.sidebar}>
                <NavLink to="/profile/" className={style.sidebarLink} activeClassName={style.active}>Profile</NavLink>
                <NavLink to="/dialogs" className={style.sidebarLink} activeClassName={style.active}>Dialogs</NavLink>
                <NavLink to="/users" className={style.sidebarLink} activeClassName={style.active}>Users</NavLink>
                <NavLink to="/contacts" className={style.sidebarLink} activeClassName={style.active}>Contacts</NavLink>
                <NavLink to="/settings" className={style.sidebarLink} activeClassName={style.active}>Settings</NavLink>
        </nav>
    )
}

export default Sidebar;