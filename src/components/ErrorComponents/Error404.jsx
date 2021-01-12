import React from 'react'
import errorImg from './../../accets/img/404.png'
import style from './Error404.module.css'

const Error404 = () => {
    return <div className={style.container}>
        <img className={style.errorImg} src={errorImg} alt="error"/>
    </div>
};

export default Error404;