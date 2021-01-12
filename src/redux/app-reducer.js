import {getAuthUser} from "./auth-reducer";

const INITIALIZED = 'app-reducer/INITIALIZED';

let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZED:
            return {
                ...state,
                initialized: true,
            };

        default:
            return state;
    }

};

const setInitialized = () => (
    {
        type: INITIALIZED,
    }
);



export const initializing = () => async dispatch => {
    await dispatch(getAuthUser());
    dispatch(setInitialized());
};

export default appReducer;
