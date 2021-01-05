import {getAuthUser} from "./auth-reducer";

const INITIALIZED = 'INITIALIZED';

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED:
            return {
                ...state,
                initialized: true,
            };

        default:
            return state;
    }

}

const setInitialized = () => {
    return {
        type: INITIALIZED,
    }
}

export const initializing = () => dispatch => {
    let promise = dispatch(getAuthUser());
    promise.then(() => {
            dispatch(setInitialized())
        }
    )
};

export default appReducer;
