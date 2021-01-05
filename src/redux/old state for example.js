import {act} from "@testing-library/react";
import profilePageReducer from "./profilePage-reducer";
import dialogsPageReducer from "./dialogsPage-reducer";




let store = {
    _callObserver(){
        console.log('Change state');
    },
    getState(){
        return this._state;
    },
    _state :{
        profilePage: {
            posts: [
                {id: 1,text: "Привет, мир!", likeCount: 15},
                {id: 2 ,text: "Я на месте!", likeCount: 16},
                {id: 3 ,text: "Юхууу", likeCount: 11},
                {id: 4 ,text: "Меня явно любит вселення", likeCount: 5},
                {id: 5 ,text: "Вперед!", likeCount: 85}
            ],
            newValuePost: '',
        },
        dialogsPage: {
            users : [
                {id:1, name: 'Artur' },
                {id:2, name: 'Jenya' },
                {id:3, name: 'Vladislav' },
                {id:4, name: 'Anton' },
                {id:5, name: 'Koshka' }
            ],
            messages : [
                {text: 'Привет'},
                {text: 'Как дела?'},
                {text: 'Что нового?'},
                {text: 'Где пропал?'},
                {text: 'Йоу'},
            ],
            newValueMessage: '',
        }
    },

    dispatch(action){
        this._state.profilePage = profilePageReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsPageReducer(this._state.dialogsPage, action);
        this._callObserver(this._state);
    },

    subscribe(observer){
        this._callObserver = observer;
    },
};



export default store;