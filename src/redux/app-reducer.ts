import { InitialStateType } from "../Types/types";
import {getAuthUser} from "./auth-reducer";

const INITIALIZED = 'app-reducer/INITIALIZED';


let initialState: InitialStateType = {
    initialized: false,
};

const appReducer = (state = initialState, action:any):InitialStateType => {
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

type SetInitializedActionType = {
    type: typeof INITIALIZED
}
const setInitialized = ():SetInitializedActionType => (
    {
        type: INITIALIZED,
    }
);



export const initializing = () => async (dispatch: any) => {
    await dispatch(getAuthUser());
    dispatch(setInitialized());
};

export default appReducer;
