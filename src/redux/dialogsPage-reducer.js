const SEND_MESSAGE = 'SEND-MESSAGE';


let initialState = {
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

const dialogsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {
                text: action.messageBody,
            };
            let newState = {...state};
            newState.messages = [...state.messages];
            newState.messages.push(newMessage);
            return newState;
        }



        default:
            return state;
    }

}


export let sendMessageActionCreater = (messageBody) => ({type: SEND_MESSAGE, messageBody});


export default dialogsPageReducer;
