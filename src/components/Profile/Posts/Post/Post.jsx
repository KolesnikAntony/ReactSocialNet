import React from 'react';
import style from './Post.module.css'

let Post = ({text, likeCount}) => {
    return(
        <li className={style.post}>
            <div className={style.content}>
                <img className={style.image} src="https://pngicon.ru/file/uploads/2_16.png" alt="avatar"/>
                <p className={style.text}>{text}</p>
            </div>
            <p>
                <span className={style.like}>Like {likeCount}</span>
            </p>
        </li>
    )
};

export default Post;