import React from 'react';
import style from './Users.module.css'
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";


const Users = ({users, followingInProgress,follow, unfollow, ...props}) => {
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