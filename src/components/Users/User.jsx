import React from 'react';
import style from "./Users.module.css";
import {NavLink} from "react-router-dom";
import userImage from "../../accets/img/user.jpg";

const User = ({user, followingInProgress, follow, unfollow}) => {


    return <div className={style.wrapper} >
        <div className={style.user}>
            <NavLink to={`/profile/${user.id}`}>
                <img src={user.photos.small !== null ? user.photos.small : userImage} alt="avatar"
                     className={style.image}/>
            </NavLink>
            {user.followed === false ?

                <ButtonFollowToggle userId={user.id} followingInProgress={followingInProgress} action={follow} value='follow'/>
                 :
                <ButtonFollowToggle userId={user.id} followingInProgress={followingInProgress} action={unfollow} value='unfollow'/>
                }
        </div>
        <div className={style.info}>
            <div className={style.myself}>
                <h3 className={style.name}>
                    {user.name}
                </h3>
                <p className={style.status}>
                    {user.status != null ? user.status : 'Тут когда то будет мой статус...'}
                </p>
            </div>
            <div className={style.location}>
                <p>Город</p>
                <p>Страна</p>
            </div>
        </div>
    </div>
};

const ButtonFollowToggle = ({followingInProgress, userId, action, value}) => {

    return  <button className={style.btn}
                    disabled={followingInProgress.some(id => id === userId)}
                    onClick={() =>
                        action(userId)}>{value}</button>
};

export default User;