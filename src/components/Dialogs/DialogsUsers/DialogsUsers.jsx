import React from 'react';
import style from './DialogsUsers.module.css'



let DialogsUsers = (props) => {
    return <span  className={style.user}>{props.name}</span>
};

export default DialogsUsers;