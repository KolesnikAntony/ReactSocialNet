import React from 'react';
import style from './Users.module.css'



let Users = (props) => {
    return <a  className={style.user}>{props.name}</a>
};

export default Users;