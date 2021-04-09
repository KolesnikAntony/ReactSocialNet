import style from "./FormControls.module.css"
import React, {FC} from 'react'
import {Field, WrappedFieldProps} from "redux-form";
import { ValidatorsFieldType} from "../../helpers/validate/validate";

export const FormControls: FC<WrappedFieldProps>  = ({input, meta, ...props}) => {
   let hasError = meta.touched && meta.error;
    return <div className={style.formControls + " " +  (hasError && style.error)}>
        <div>
            {props.children}
            <span>{hasError && meta.error}</span>
        </div>
    </div>
};

export const Input: FC<WrappedFieldProps> = props => {
    let {input, meta, ...restProps} = props;
    return <FormControls {...props}><input {...input} {...restProps} /></FormControls>
}

export const Textarea: FC<WrappedFieldProps> = props => {
    let {input, meta, ...restProps} = props;
    return <FormControls {...props}><textarea {...input} {...restProps} /></FormControls>
}


export function createField<KeysOfName extends string> (placeholder: string | undefined,
                            component: string | FC<WrappedFieldProps>, name: KeysOfName,
                            type: string, validators: Array<ValidatorsFieldType>,
                            id:string | undefined,
                            props={} ){
    return <Field component={component} name={name} placeholder={placeholder} type={type} validate={validators} id={id}/>
}



