import {usersAPI} from "../api/api";
import {updateObjectArray} from "../helpers/object-helpers";
import {PhotosType, UserType} from "../Types/types";

const FOLLOW = 'userPage-reducer/FOLLOW';
const UNFOLLOW = 'userPage-reducer/UNFOLLOW';
const SET_USERS = 'userPage-reducer/SET-USERS';
const SET_CURRENT_PAGE = 'userPage-reducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS = 'userPage-reducer/SET_TOTAL_USERS';
const TOGGLE_PRELOADER = 'userPage-reducer/TOGGLE_PRELOADER';
const FOLLOWING_IN_PROGRESS = 'userPage-reducer/FOLLOWING_IN_PROGRESS';



const initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    totalUsers: 31,
    pageSize: 5,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    portionSize: 10,
};

type InitialStateType = typeof initialState

const usersPageReducer = (state = initialState, action: any): InitialStateType => {

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

type OnFollowActionType = {
    type: typeof FOLLOW,
    id: number
}
export const onFollow = (id: number): OnFollowActionType => ({
    type: FOLLOW,
    id: id,
});
type OnUnfollowActionType = {
    type: typeof UNFOLLOW,
    id: number
}
export const onUnfollow = (id: number):OnUnfollowActionType => ({
    type: UNFOLLOW,
    id: id,
});

type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
const setUsers = (users: Array<UserType>): SetUsersActionType => ({
    type: SET_USERS,
    users: users,
});

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});

type SetTotalUsersActionType = {
    type: typeof SET_TOTAL_USERS,
    totalUsers: number
}
const setTotalUsers = (totalUsers: number): SetTotalUsersActionType=> ({
    type: SET_TOTAL_USERS,
    totalUsers,
});

type togglePreloaderActionType = {
    type: typeof TOGGLE_PRELOADER,
    isFetching: boolean
}
const togglePreloader = (isFetching: boolean): togglePreloaderActionType => ({
    type: TOGGLE_PRELOADER,
    isFetching,
});

type SetFollowingInProgressActionType = {
    type: typeof FOLLOWING_IN_PROGRESS
    followingInProgress: boolean
    userId: number
}

const setFollowingInProgress = (followingInProgress: boolean, userId: number):SetFollowingInProgressActionType => ({
    type: FOLLOWING_IN_PROGRESS,
    followingInProgress,
    userId,
});


export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(togglePreloader(true));

    let response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(togglePreloader(false));
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsers(response.data.totalCount));
};

const toggleFollowFlow = async (userId: number, apiMethod: any, actionCreator: any, dispatch: any) => {

    dispatch(setFollowingInProgress(true, userId));

    let response = await apiMethod;
    if (response.data.resultCode === 0) {
        dispatch(actionCreator);
    }

    dispatch(setFollowingInProgress(false, userId));
};


export const unfollow = (userId: number) => async (dispatch: any) => {
    toggleFollowFlow(userId, usersAPI.unfollow(userId), onUnfollow(userId), dispatch)
};

export const follow = (userId: number) => async (dispatch: any) => {
    toggleFollowFlow(userId, usersAPI.follow(userId), onFollow(userId), dispatch)
};

export default usersPageReducer;