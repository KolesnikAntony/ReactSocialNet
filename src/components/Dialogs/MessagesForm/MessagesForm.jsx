import style from "../Dialogs.module.css";
import React from "react"
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormControls/FormControls";
import {required} from "../../../helpers/validate/validate";

const MessagesForm = (props) => {
    return <form className={style.inform} onSubmit={props.handleSubmit}>
        <Field component={Textarea} validate={required} name='sendMessage' className={style.textarea} placeholder='Send message'/>
        <button className={style.btn}>Send</button>
    </form>
}

const MessagesFormComponent = reduxForm({form: 'Messages form'})(MessagesForm);
export default MessagesFormComponent;

