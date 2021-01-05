import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatusHooks from "./ProfileStatusHooks";

let ProfileInfo = (props) => {
    if(!props.userProfile){
        return <Preloader/>
    }
    return (
        <div className={style.profileInfo}>
            <div className={style.imagebox}>
                <img src="https://mapi7.com/assets/images/blog/cherno-beloe-foto/cherno-beloe-foto-7.jpg" alt="profile-img" className={style.image}/>
            </div>
            <div className={style.profile}><img src={props.userProfile.photos.small} alt="Avatar"/>
            <div>
                <h3>{props.userProfile.fullName}</h3>
                <p>{props.userProfile.aboutMe}</p>
                <ProfileStatusHooks status={props.status} updateProfileStatus={props.updateProfileStatus} />
            </div>
            </div>
        </div>
    )
};

export default ProfileInfo;