import React from 'react'
import style from "../Posts.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../../common/FormControls/FormControls";
import {maxLength, required} from "../../../../helpers/validate/validate";

const PostForm = (props) => {
    return <form onSubmit={props.handleSubmit} className={style.inform}>
        <Field  name={"addPost"} component={Textarea} className={style.textarea} validate={[required]}/>
        <button className={style.btn}>Send</button>
    </form>
}

const PostFormComponent = reduxForm({form: 'post form'})(PostForm)

export default PostFormComponent;