import React, {useState} from 'react';
import style from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Preloader";
import ProfileDataForm from "./ProfileDataForm";
import ProfileData from "./ProfileData";
import ProfileStatus from "./ProfileStatus";
import img from './../../../accets/img/user.jpg';


let ProfileInfo = props => {
    let {updateProfileData, updateProfilePhoto, userProfile, isOwner, status, updateProfileStatus} = props;

    const [editMode, setEditMode] = useState(false);
    const [isHovering, setIsHovering] = useState( false);


    const toggleEditMode = () => {
        setEditMode(true)
    };

    const saveProfileData = formData => {
        updateProfileData(formData).then(
            () => setEditMode(false)
        )
    };

    const transferFile = e => {
        let photo = e.target.files;
        if (photo.length) updateProfilePhoto(photo[0]);
    };

    const handleHover = () => {
        setIsHovering(!isHovering);
    };


    if (!userProfile) {
        return <Preloader/>
    }

    return (
        <div className={style.profileInfo}>
            <div onMouseEnter={handleHover} onMouseLeave={handleHover}>
                {isOwner && isHovering && <label htmlFor={style.changePhoto} className={style.customFile}>
                    Change photo...
                    <input id={style.changePhoto} type="file" onChange={transferFile}/>
                </label>}
                {userProfile.photos.large ? <img src={userProfile.photos.large} className={style.avatar} alt="Avatar"/> :
                    <img src={img} alt="Avatar" className={style.avatar}/>  }

            </div>
            <div>
                <ProfileStatus status={status}
                               updateProfileStatus={updateProfileStatus}/>
                {editMode ?
                    <ProfileDataForm initialValues={userProfile} userProfile={userProfile} onSubmit={saveProfileData}/>
                    : <ProfileData userProfile={userProfile} toggleEditMode={toggleEditMode} isOwner={isOwner}/>}
            </div>
        </div>
    )
};

export default ProfileInfo;