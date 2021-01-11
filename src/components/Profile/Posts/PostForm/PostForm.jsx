import React from 'react'
import style from "../Posts.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../../common/FormControls/FormControls";

const PostForm = ({handleSubmit}) => {

    return <form onSubmit={handleSubmit} className={style.inform}>
        <Field  name={"postBody"} component={Textarea} className={style.textarea}/>
        <button className={style.btn}>send</button>
    </form>
}

const PostFormComponent = reduxForm({form: 'post form'})(PostForm)
export default PostFormComponent;