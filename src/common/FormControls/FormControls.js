import style from "./FormControls.module.css"
import React from 'react'

export const FormControls = ({input, meta, ...props}) => {
   let hasError = meta.touched && meta.error;
    return <div className={style.formControls + " " +  (hasError && style.error)}>
        <div>
            {props.children}
            <span>{hasError && meta.error}</span>
        </div>
    </div>
};

export const Input = props => {
    let {input, meta, ...restProps} = props;
    return <FormControls {...props}><input {...input} {...restProps} /></FormControls>
};

export const Textarea = props => {
    let {input, meta, ...restProps} = props;
    return <FormControls {...props}><textarea {...input} {...restProps} /></FormControls>
};

