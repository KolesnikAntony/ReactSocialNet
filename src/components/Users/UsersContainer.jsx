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


const UsersContainer = (props) => {

    useEffect(()=> props.getUsers(props.currentPage, props.pageSize), []);

    const showCurrentUsers = page => {
        props.getUsers(page, props.pageSize);
    }

    return <>
        {props.isFetching && <Preloader/>}
        <Users {...props} showCurrentUsers={showCurrentUsers}/>
        </>
};



// class UsersContainer extends React.Component {
//
//     componentDidMount() {
//         this.props.getUsers(this.props.currentPage, this.props.pageSize);
//
//     }
//     showCurrentUsers = (page) => {
//         this.props.getUsers(page, this.props.pageSize);
//     }
//
//     render() {
//         return <>
//             {this.props.isFetching === true && <Preloader/>}
//             <Users
//             users={this.props.users}
//             currentPage={this.props.currentPage}
//             totalUsers={this.props.totalUsers}
//             pageSize={this.props.pageSize}
//             showCurrentUsers={this.showCurrentUsers}
//             unfollow={this.props.unfollow}
//             follow={this.props.follow}
//             followingInProgress={this.props.followingInProgress}
//             portionSize={this.props.portionSize}
//         />
//         </>
//     }
// }




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