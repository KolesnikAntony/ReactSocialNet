import {usersAPI} from "../api/api";
import {updateObjectArray} from "../helpers/object-helpers";

const FOLLOW = 'userPage-reducer/FOLLOW';
const UNFOLLOW = 'userPage-reducer/UNFOLLOW';
const SET_USERS = 'userPage-reducer/SET-USERS';
const SET_CURRENT_PAGE = 'userPage-reducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS = 'userPage-reducer/SET_TOTAL_USERS';
const TOGGLE_PRELOADER = 'userPage-reducer/TOGGLE_PRELOADER';
const FOLLOWING_IN_PROGRESS = 'userPage-reducer/FOLLOWING_IN_PROGRESS';

const initialState = {
    users: [],
    currentPage: 1,
    totalUsers: 31,
    pageSize: 5,
    isFetching: false,
    followingInProgress: [],
    portionSize: 10,
};

const usersPageReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectArray(state.users, action.id, 'id', {followed: true,}),

            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectArray(state.users, action.id, 'id', {followed: false,})
            };
        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_USERS:
            return {
                ...state,
                totalUsers: action.totalUsers
            };
        case TOGGLE_PRELOADER:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter(id => id !== action.userId)]
                ,
            };

        default:
            return state;
    }
};


export const onFollow = id => ({
    type: FOLLOW,
    id: id,
});

export const onUnfollow = id => ({
    type: UNFOLLOW,
    id: id,
});

const setUsers = users => ({
    type: SET_USERS,
    users: users,
});

const setCurrentPage = currentPage => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});

const setTotalUsers = totalUsers => ({
    type: SET_TOTAL_USERS,
    totalUsers,
});

const togglePreloader = isFetching => ({
    type: TOGGLE_PRELOADER,
    isFetching,
});

const setFollowingInProgress = (followingInProgress, userId) => ({
    type: FOLLOWING_IN_PROGRESS,
    followingInProgress,
    userId,
});


export const getUsers = (currentPage, pageSize) => async dispatch => {
    dispatch(setCurrentPage(currentPage));
    dispatch(togglePreloader(true));

    let response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(togglePreloader(false));
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsers(response.data.totalCount));
};

const toggleFollowFlow = async (userId, apiMethod, actionCreator, dispatch) => {

    dispatch(setFollowingInProgress(true, userId));

    let response = await apiMethod;
    if (response.data.resultCode === 0) {
        dispatch(actionCreator);
    }

    dispatch(setFollowingInProgress(false, userId));
};


export const unfollow = userId => async dispatch => {
    toggleFollowFlow(userId, usersAPI.unfollow(userId), onUnfollow(userId), dispatch)
};

export const follow = userId => async dispatch => {
    toggleFollowFlow(userId, usersAPI.follow(userId), onFollow(userId), dispatch)
};

export default usersPageReducer;