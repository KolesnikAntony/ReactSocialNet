import {usersAPI} from "../api/api-users";
import {updateObjectArray} from "../helpers/object-helpers";
import {UserType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {Action, Dispatch} from "redux";
import {AppStateType, InferActionsTypes} from "./redux-store";


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
type ActionType = InferActionsTypes<typeof actions>;

const usersPageReducer = (state = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case "userPage-reducer/FOLLOW":
            return {
                ...state,
                users: updateObjectArray(state.users, action.id, 'id', {followed: true,}),

            };
        case "userPage-reducer/UNFOLLOW":
            return {
                ...state,
                users: updateObjectArray(state.users, action.id, 'id', {followed: false,})
            };
        case "userPage-reducer/SET-USERS":
            return {
                ...state,
                users: [...action.users],
            };
        case "userPage-reducer/SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            };
        case "userPage-reducer/SET_TOTAL_USERS":
            return {
                ...state,
                totalUsers: action.totalUsers
            };
        case "userPage-reducer/TOGGLE_PRELOADER":
            return {
                ...state,
                isFetching: action.isFetching
            };
        case "userPage-reducer/FOLLOWING_IN_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id !== action.userId)]
                ,
            };

        default:
            return state;
    }
};


export const actions = {
    onFollow: (id: number) => ({
        type: 'userPage-reducer/FOLLOW',
        id: id,
    } as const ),
    onUnfollow: (id: number) => ({
        type: 'userPage-reducer/UNFOLLOW',
        id: id,
    } as const),

    setUsers: (users: Array<UserType>) => ({
        type: 'userPage-reducer/SET-USERS',
        users: users,
    } as const),

    setCurrentPage: (currentPage: number) => ({
        type: 'userPage-reducer/SET_CURRENT_PAGE',
        currentPage,
    } as const),

    setTotalUsers: (totalUsers: number) => ({
        type: 'userPage-reducer/SET_TOTAL_USERS',
        totalUsers,
    } as const),

    togglePreloader: (isFetching: boolean) => ({
        type: 'userPage-reducer/TOGGLE_PRELOADER',
        isFetching,
    } as const),

    setFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'userPage-reducer/FOLLOWING_IN_PROGRESS',
        isFetching,
        userId,
    } as const),

}

type DispatchType = Dispatch<ActionType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.togglePreloader(true));

    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(actions.togglePreloader(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsers(data.totalCount));
};

const toggleFollowFlow = async (userId: number, apiMethod: any, actionCreator: ActionType, dispatch: DispatchType) => {

    dispatch(actions.setFollowingInProgress(true, userId));

    let response = await apiMethod;
    if (response.data.resultCode === 0) {
        dispatch(actionCreator);
    }

    dispatch(actions.setFollowingInProgress(false, userId));
};


export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    toggleFollowFlow(userId, usersAPI.unfollow(userId), actions.onUnfollow(userId), dispatch)
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    toggleFollowFlow(userId, usersAPI.follow(userId), actions.onFollow(userId), dispatch)
};

export default usersPageReducer;