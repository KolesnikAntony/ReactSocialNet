import React, {FC, useEffect} from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {
    follow,
    getUsers,
    unfollow,
} from "../../redux/usersPage-reducer";
import Preloader from "../../common/Preloader/Preloader";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/AuthRedirect";
import {
    requestCurrentPage, requestFollowingInProgress,
    requestIsFetching,
    requestPageSize, requestPortionSize,
    requestTotalUsers,
    requestUsers
} from "../../redux/selectors";
import {AppStateType} from "../../redux/redux-store";
import {UserType} from "../../Types/types";



type MapStatePropsType = {
    users: Array<UserType>,
    currentPage: number,
    totalUsers: number,
    pageSize: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
    portionSize: number,

}

type MapDispatchPropsType = {
    getUsers: (page: number, pageSize: number)=> void,
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    showCurrentUsers: (currentPageOfPortion: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const UsersContainer:FC <PropsType> = props => {

    useEffect(()=> props.getUsers(props.currentPage, props.pageSize), [props.currentPage]);

    const showCurrentUsers = (page: number) => {
        props.getUsers(page, props.pageSize);
    };

    return <>
        <h2>{props.pageTitle}</h2>
        {props.isFetching && <Preloader/>}
        <Users {...props} showCurrentUsers={showCurrentUsers}/>
        </>
};


const mapStateToProps = (state: AppStateType) => {
    return {
        users: requestUsers(state),
        currentPage: requestCurrentPage(state),
        totalUsers: requestTotalUsers(state),
        pageSize: requestPageSize(state),
        isFetching: requestIsFetching(state),
        followingInProgress: requestFollowingInProgress(state),
        portionSize: requestPortionSize(state),
    }
};


export default compose(
    connect(mapStateToProps, {unfollow, follow, getUsers}),
    withAuthRedirect,
)(UsersContainer);