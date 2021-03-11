import React, {FC} from 'react';
import style from './Users.module.css'
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../Types/types";

type PropsType = {

    users: Array<UserType>

    followingInProgress: Array<number>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,

    totalUsers: number,
    pageSize: number,
    portionSize: number,
    currentPage: number,
    showCurrentUsers: (currentPageOfPortion: number) => void
}

const Users:FC<PropsType> = ({users, followingInProgress,follow, unfollow, ...props}) => {
    return <div className={style.container}>
        <Paginator currentPage={props.currentPage}
                   totalUsers={props.totalUsers}
                   pageSize={props.pageSize}
                   portionSize={props.portionSize}
                   showCurrentUsers={props.showCurrentUsers}/>

        {users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow}/>)}
    </div>
};

export default Users;