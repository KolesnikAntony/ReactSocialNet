import {applyMiddleware, combineReducers, createStore} from "redux";
import profilePageReducer from "./profilePage-reducer";
import dialogsPageReducer from "./dialogsPage-reducer";
import usersPageReducer from "./usersPage-reducer";
import thunkMiddleWare from "redux-thunk";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";


let reducers = combineReducers(
    {
        dialogsPage: dialogsPageReducer,
        profilePage: profilePageReducer,
        usersPage: usersPageReducer,
        authTemplate: authReducer,
        form: formReducer,
        app: appReducer,
    }
)

type RootReduserType = typeof reducers;
export type AppStateType = ReturnType<RootReduserType>

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));


export default store;