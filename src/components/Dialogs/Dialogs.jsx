import React from 'react';
import style from './Dialogs.module.css'
import DialogsUsers from "./DialogsUsers/DialogsUsers";
import Messages from "./Messages/Messages";
import MessagesForm from "./MessagesForm/MessagesForm";
import {onSendMessage} from "../../redux/dialogsPage-reducer";
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/AuthRedirect";
import {requestDialogsPage} from "../../redux/selectors";




let Dialogs = ({dialogsPage,onSendMessage}) => {
    let usersArray = dialogsPage.users.map(el => <DialogsUsers key={el.id} id={el.id} name={el.name}/>);
    let messagesArray = dialogsPage.messages.map(el=><Messages key={el.id} text={el.text}/>);

    const sendMessage = messageBody => {
        onSendMessage(messageBody);
    };

    const onSubmit = value => {
        sendMessage(value.sendMessage);
    };



    return(
        <div className={style.dialogs}>
            <div className={style.users}>
                {usersArray}
            </div>
            <div className={style.messages}>
                {messagesArray}
                <MessagesForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
};


const mapStoreToProps = state => ({
    dialogsPage: requestDialogsPage(state),
});

export default compose(
    connect(mapStoreToProps,{ onSendMessage} ),
    withAuthRedirect
)(Dialogs);

