import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';


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
}

const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 6,
                text: action.postBody,
                likeCount: 0
            };
            let newState = {...state};
            newState.posts = [...state.posts];
            newState.posts.push(newPost);
            return newState;
        };


        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile,
            }
        case SET_PROFILE_STATUS:
            return {
                ...state,
                status: action.status,
            };
        default:
            return state;
    }
}

export let onAddPost = (postBody) => {
    return {type: ADD_POST,
        postBody,
    }
};

export let setUserProfile = (userProfile) => {
    return {
        type: SET_USER_PROFILE,
        userProfile,
    }
}

export  let setProfileStatus = (status) => {
    return {
        type: SET_PROFILE_STATUS,
        status,
    }
}

export  let getProfileStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setProfileStatus(response.data));
    })
}

export let getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data));
    })
};

export  let updateProfileStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(setProfileStatus(status));
        }
    })
}


export default profilePageReducer;