import React from 'react';
import style from './Dialogs.module.css'
import Users from "./Users/Users";
import Messages from "./Messages/Messages";
import MessagesFormComponent from "./MessagesForm/MessagesForm";




let Dialogs = (props) => {
    let usersArray = props.state.users.map(el => <Users id={el.id} name={el.name}/>);
    let messagesArray = props.state.messages.map(el=><Messages text={el.text}/>);

    let sendMessage = (messageBody) => {
        props.onSendMessage(messageBody);
    };

    let onSubmit = (value) => {
        sendMessage(value.sendMessage);
    };



    return(
        <div className={style.dialogs}>
            <div className={style.users}>
                {usersArray}
            </div>
            <div className={style.messages}>
                {messagesArray}
                <MessagesFormComponent onSubmit={onSubmit}/>
            </div>
        </div>
    )
}


export default Dialogs;