import React from 'react';
import style from './Users.module.css'
import userImage from '../../accets/img/user.jpg'
import {NavLink} from "react-router-dom";
import Paginator from "../../common/Paginator/Paginator";



const Users = (props) => {
    return <div className={style.container}>
        <Paginator currentPage={props.currentPage}
                   totalUsers={props.totalUsers}
                   pageSize={props.pageSize}
                   portionSize={props.portionSize}
                   showCurrentUsers={props.showCurrentUsers} />
        {props.users.map(u =>
                <div className={style.wrapper}>
                    <div className={style.user}>
                        <NavLink to={`/profile/${u.id}`}>
                            <img src={u.photos.small !== null ? u.photos.small : userImage} alt="avatar" className={style.image}/>
                        </NavLink>
                        {u.followed == false ?
                            <button className={style.btn}
                                    disabled={props.followingInProgress.some(id => id == u.id)}
                                    onClick={() =>
                                props.follow(u.id)}>follow</button> :
                            <button className={style.btn}
                                    disabled={props.followingInProgress.some(id => id == u.id)}
                                    onClick={() =>
                                props.unfollow(u.id)}>unfollow</button>}
                    </div>
                    <div className={style.info}>
                        <div className={style.myself}>
                            <h3 className={style.name}>
                                {u.name}
                            </h3>
                            <p className={style.status}>
                                {u.status != null ? u.status : 'Тут когда то будет мой статус...'}
                            </p>
                        </div>
                        <div className={style.location}>
                            <p>Город</p>
                            <p>Страна</p>
                        </div>
                    </div>
                </div>
            )
        }

    </div>
}

export default Users;