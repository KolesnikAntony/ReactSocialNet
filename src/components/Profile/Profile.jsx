import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import Posts from "./Posts/Posts";

let Profile = props => {
    let {updateProfileData, updateProfilePhoto,loggedId,userProfile,status,updateProfileStatus} = props;
    return(
        <>
            <ProfileInfo updateProfileData={updateProfileData}
                         updateProfilePhoto={updateProfilePhoto}
                         isOwner={!props.match.params.userId}
                         userProfile={userProfile}
                         status={status}
                         updateProfileStatus={updateProfileStatus}/>
            <Posts/>
        </>
    )
};

export default Profile;