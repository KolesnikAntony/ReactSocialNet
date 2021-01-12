import React, {useEffect} from 'react';
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


const UsersContainer = props => {

    useEffect(()=> props.getUsers(props.currentPage, props.pageSize), [props.currentPage]);

    const showCurrentUsers = page => {
        props.getUsers(page, props.pageSize);
    };

    return <>
        {props.isFetching && <Preloader/>}
        <Users {...props} showCurrentUsers={showCurrentUsers}/>
        </>
};


const mapStateToProps = state => {
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