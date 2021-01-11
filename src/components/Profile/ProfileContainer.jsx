import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileStatus,
    getUserProfile, updateProfileData,
    updateProfilePhoto,
    updateProfileStatus
} from "../../redux/profilePage-reducer";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/AuthRedirect";
import {requestAuthId, requestStatus, requestUserProfile} from "../../redux/selectors";

const ProfileContainer = props => {

    useEffect(()=> refreshGetUserProfile(), [props.match.params.userId]);

    const refreshGetUserProfile = () => {
        let userId = props.match.params.userId;
        if(!userId) {
            userId = props.loggedId;
        }
        props.getUserProfile(userId);
        props.getProfileStatus(userId);
    }

    return <Profile {...props}/>
}


const mapStateToProps = state => (
    {
        userProfile: requestUserProfile(state),
        loggedId: requestAuthId(state),
        status: requestStatus(state),
    }
)


const mapDispatchToProps = {
    getUserProfile,
    getProfileStatus,
    updateProfileStatus,
    updateProfilePhoto,
    updateProfileData,
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps ),
    withAuthRedirect,
)(ProfileContainer)
