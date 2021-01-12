import React from 'react';
import style from "./ProfileInfo.module.css";

const ProfileData = ({userProfile, toggleEditMode,isOwner}) => {
    return (
        <div className={style.profile}>
            <div>
                {isOwner && <button onClick={toggleEditMode} className={style.profileBtn}>edit</button> }
            </div>
            <ul>
                <li>
                    <h3>{userProfile.fullName}</h3>
                </li>
                <li>
                    <b>About me: </b>
                    <span>{userProfile.aboutMe}</span>
                </li>
                <li>
                    <b>Looking for job: </b>
                    <span>{userProfile.lookingForAJob ? 'Yes' : 'No'}</span>
                </li>
                {userProfile.lookingForAJob && <li>
                    <b>Description of job: </b>
                    <span>{userProfile.lookingForAJobDescription}</span>
                </li>}
                <li>
                    <b>Contacts</b>
                    <ul className={style.contacts}>
                        {Object.entries(userProfile.contacts).map(k => {
                                if(k[1] != null && k[1] !== ''){
                                    return  <li key={k[0]}>
                                        <b>{k[0]}: </b>
                                        <span>{k[1]}</span>
                                    </li>
                                }
                            })
                        }
                    </ul>
                </li>
            </ul>
        </div>
    )
};
export default ProfileData;