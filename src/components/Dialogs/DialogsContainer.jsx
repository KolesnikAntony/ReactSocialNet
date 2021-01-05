import React from 'react';

import {sendMessageActionCreater, } from "../../redux/dialogsPage-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/AuthRedirect";


const mapStoreToProps = (state) => {
    return {
        state: state.dialogsPage,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSendMessage: (messageBody) => dispatch(sendMessageActionCreater(messageBody)),
    }
}

export default compose(
    connect(mapStoreToProps, mapDispatchToProps ),
    withAuthRedirect
)(Dialogs)

