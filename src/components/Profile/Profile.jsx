import React from 'react';
import style from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import PostsContainer from "./Posts/PostsContainer";




let Profile = (props) => {
    return(
        <div className={style.profile}>
            <ProfileInfo userProfile={props.userProfile} status={props.status} updateProfileStatus={props.updateProfileStatus}/>
            <PostsContainer/>
        </div>
    )
};



export default Profile;