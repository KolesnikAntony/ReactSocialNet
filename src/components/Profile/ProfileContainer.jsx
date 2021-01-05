import React from 'react';

import {withRouter} from "react-router-dom";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileStatus, getUserProfile, updateProfileStatus} from "../../redux/profilePage-reducer";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/AuthRedirect";


class ProfileContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.loggedId;
        }
        this.props.getUserProfile(userId);
        this.props.getProfileStatus(userId);
    }

    render() {
        return <Profile {...this.props}
        />
    }
};


const mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        loggedId: state.authTemplate.id,
        status: state.profilePage.status
    }
}

const mapDispatchToProps = {
    getUserProfile,
    getProfileStatus,
    updateProfileStatus
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps ),
    withAuthRedirect,
)(ProfileContainer)
