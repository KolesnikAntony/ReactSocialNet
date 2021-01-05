import React from 'react';
import style from './Messages.module.css'

let Messages = (props) => {
    return <p className={style.message}>{props.text}</p>
};

export default Messages;