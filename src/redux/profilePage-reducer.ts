import {profileAPI} from "../api/api";
import {reset, stopSubmit} from "redux-form";
import {UserProfileType} from "../Types/types";

const ADD_POST = 'profilePage-reducer/ADD-POST';
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'profilePage/SET_PROFILE_STATUS';
const SET_PHOTO = 'profilePage/SET_PHOTO';

type PostType = {
    id: number
    text: string
    likeCount: number
}
let initialState = {
    posts: [
        {id: 1, text: "Привет, мир!", likeCount: 15},
        {id: 2, text: "Я на месте!", likeCount: 16},
        {id: 3, text: "Юхууу", likeCount: 11},
        {id: 4, text: "Меня явно любит вселення", likeCount: 5},
        {id: 5, text: "Вперед!", likeCount: 85}
    ] as Array<PostType>,
    userProfile: null as UserProfileType | null,
    status: '',
};

type InitialStateType = typeof initialState

const profilePageReducer = (state = initialState, action: any): InitialStateType => {
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
                userProfile: {...state.userProfile as UserProfileType, photos: action.photo},
            };
        default:
            return state;
    }
};


type OnAddPostSuccessActionType = {
    type: typeof ADD_POST,
    postBody: string
}
const onAddPostSuccess = (postBody: string): OnAddPostSuccessActionType => ({
    type: ADD_POST,
    postBody,
});

export const onAddPost = (postBody: string) => (dispatch: any) => {
    dispatch(onAddPostSuccess(postBody));
    dispatch(reset('post form'));
};


type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    userProfile: UserProfileType
}

const setUserProfile = (userProfile: UserProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    userProfile,
});

type SetProfileStatusActionType = {
    type: typeof SET_PROFILE_STATUS,
    status: string
}

const setProfileStatus = (status: string): SetProfileStatusActionType => ({
    type: SET_PROFILE_STATUS,
    status,
});

type  SetPhotoActionType = {
    type: typeof SET_PHOTO,
    photo: any
}
const setPhoto = (photo: any): SetPhotoActionType => ({
    type: SET_PHOTO,
    photo,
});


export const getProfileStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setProfileStatus(response.data));

};

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};

export const updateProfileStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setProfileStatus(status));
    }
};

export const updateProfilePhoto = (photo: any) => async (dispatch: any) => {
    let response = await profileAPI.updatePhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos));
    }
};

export const updateProfileData = (profileData: UserProfileType) => async (dispatch: any, getState: any) => {
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