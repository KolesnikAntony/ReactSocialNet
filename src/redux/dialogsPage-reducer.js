import {reset} from "redux-form";

const SEND_MESSAGE = 'dialogPage-reducer/SEND-MESSAGE';


let initialState = {
    users : [
        {id:1, name: 'Artur' },
        {id:2, name: 'Jenya' },
        {id:3, name: 'Vladislav' },
        {id:4, name: 'Anton' },
        {id:5, name: 'Koshka' }
    ],
    messages : [
        {id: 1, text: 'Привет'},
        {id: 2, text: 'Как дела?'},
        {id: 3, text: 'Что нового?'},
        {id: 4, text: 'Где пропал?'},
        {id: 5, text: 'Йоу'},
    ],
};

const dialogsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {
                text: action.messageBody,
                id: state.messages.length + 1,
            };

            return  {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }



        default:
            return state;
    }

}


const onSendMessageSuccess = messageBody => ({type: SEND_MESSAGE, messageBody});

export const onSendMessage = messageBody => dispatch => {
    dispatch(onSendMessageSuccess(messageBody));
    dispatch(reset('Messages form'));
};


export default dialogsPageReducer;
