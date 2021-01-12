import {profileAPI} from "../api/api";
import {reset, stopSubmit} from "redux-form";

const ADD_POST = 'profilePage-reducer/ADD-POST';
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'profilePage/SET_PROFILE_STATUS';
const SET_PHOTO = 'profilePage/SET_PHOTO';


let initialState = {
    posts: [
        {id: 1, text: "Привет, мир!", likeCount: 15},
        {id: 2, text: "Я на месте!", likeCount: 16},
        {id: 3, text: "Юхууу", likeCount: 11},
        {id: 4, text: "Меня явно любит вселення", likeCount: 5},
        {id: 5, text: "Вперед!", likeCount: 85}
    ],
    userProfile: null,
    status: '',
};

const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                text: action.postBody,
                likeCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost].reverse(),
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile,
            };
        case SET_PROFILE_STATUS:
            return {
                ...state,
                status: action.status,
            };
        case SET_PHOTO:
            return {
                ...state,
                userProfile: {...state.userProfile, photos: action.photo},
            };
        default:
            return state;
    }
};

const onAddPostSuccess = postBody => ({
    type: ADD_POST,
    postBody,
});

export const onAddPost = postBody => dispatch => {
    dispatch(onAddPostSuccess(postBody));
    dispatch(reset('post form'));
};

const setUserProfile = userProfile => ({
    type: SET_USER_PROFILE,
    userProfile,
});

const setProfileStatus = status => ({
    type: SET_PROFILE_STATUS,
    status,
});

const setPhoto = photo => ({
    type: SET_PHOTO,
    photo,
});


export const getProfileStatus = userId => async dispatch => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setProfileStatus(response.data));

};

export const getUserProfile = userId => async dispatch => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};

export const updateProfileStatus = status => async dispatch => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setProfileStatus(status));
    }
};

export const updateProfilePhoto = photo => async dispatch => {
    let response = await profileAPI.updatePhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos));
    }
};

export const updateProfileData = profileData => async (dispatch, getState) => {
    let userId = getState().authTemplate.id;
    let response = await profileAPI.updateProfile(profileData);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        let messageError = response.data.messages.length > 0 ? response.data.messages : "Some error";
        dispatch(stopSubmit('profile', {_error: messageError}));
        return Promise.reject(response.data.messages[0]);
    }
};

export default profilePageReducer;