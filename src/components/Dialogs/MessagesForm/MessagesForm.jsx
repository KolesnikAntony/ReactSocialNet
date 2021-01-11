import style from "../Dialogs.module.css";
import React from "react"
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormControls/FormControls";

const MessagesForm = ({handleSubmit}) => {
    return <form className={style.inform} onSubmit={handleSubmit}>
        <Field component={Textarea}  name='sendMessage' className={style.textarea} placeholder='Send message'/>
        <button className={style.btn}>Send</button>
    </form>
};

export default reduxForm({form: 'Messages form'})(MessagesForm);

