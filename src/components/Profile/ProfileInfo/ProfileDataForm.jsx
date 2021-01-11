import React from 'react';
import er from "../../Login/LoginForm/loginForm.module.css"
import style from './ProfileInfo.module.css'
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../common/FormControls/FormControls";


const ProfileDataForm = ({userProfile,handleSubmit, error}) => {

    return(
        <form  onSubmit={handleSubmit}>
            <button className={style.profileBtn}>save</button>
            {error && <p className={er.isError}>{error}</p>}

            <ul className={style.dataList}>
                <div className={style.mainData}>
                    <li>
                        <b>Full name</b>
                        <Field component={Input} name='fullName' placeholder='Name' />
                    </li>
                    <li>
                        <b>About me: </b>
                        <Field component={Input} name='aboutMe' placeholder='About me...' />
                    </li>
                    <li>
                        <b>Looking for job: </b>
                        <Field component={Input} name='lookingForAJob' type='checkbox'/>
                    </li>
                    <li>
                        <b>Description of  job: </b>
                        <Field component={Textarea} name='lookingForAJobDescription' placeholder='Description of job...' />
                    </li>
                </div>
                <div>
                    <li>
                        <ul>
                            {Object.keys(userProfile.contacts)
                                .map(k => {
                                    return <li key={k}>
                                        <b>{k +': '}</b>
                                        <Field component={Input} name={'contacts.'+k} placeholder={k}/>
                                    </li>
                                })}
                        </ul>
                    </li>
                </div>
            </ul>



        </form>
    )
};
export default reduxForm({form: 'profile'})(ProfileDataForm);