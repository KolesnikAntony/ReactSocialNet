import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS = 'SET_TOTAL_USERS'
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS'

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
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {
                            ...u,
                            followed: true
                        }
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {
                            ...u,
                            followed: false
                        }
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS:
            return {
                ...state,
                totalUsers: action.totalUsers
            }
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
                    : [state.followingInProgress.filter(id => id != action.userId)]
                ,
            }

        default:
            return state;
    }
};


export let onFollow = (id) => {
    return {
        type: FOLLOW,
        id: id,
    }
};
export let onUnfollow = (id) => {
    return {
        type: UNFOLLOW,
        id: id,
    }
};


export let setUsers = (users) => {
    return {
        type: SET_USERS,
        users: users,
    }
};

export let setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage,
    }
};

export let setTotalUsers = (totalUsers) => {
    return {
        type: SET_TOTAL_USERS,
        totalUsers,
    }
};
export let togglePreloader = (isFetching) => {
    return {
        type: TOGGLE_PRELOADER,
        isFetching,
    }
};

let setFollowingInProgress = (followingInProgress, userId) => {
    return {
        type: FOLLOWING_IN_PROGRESS,
        followingInProgress,
        userId,
    }
}


export let getUsers = (currentPage, pageSize) => (dispatch) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(togglePreloader(true));
    usersAPI.getUsers(currentPage, pageSize).then(response => {
        dispatch(togglePreloader(false));
        dispatch(setUsers(response.data.items));
        dispatch(setTotalUsers(response.data.totalCount));
    })
};

export let unfollow = (userId) => (dispatch) => {
    dispatch(setFollowingInProgress(true, userId));
    usersAPI.unfollow(userId).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(onUnfollow(userId))
        }
        dispatch(setFollowingInProgress(false, userId));
    })
};
export let follow = (userId) => (dispatch) => {
    dispatch(setFollowingInProgress(true, userId));
    usersAPI.follow(userId).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(onFollow(userId))
        }
        dispatch(setFollowingInProgress(false, userId));
    })
};

export default usersPageReducer;