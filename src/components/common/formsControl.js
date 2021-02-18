import React from "react";
import s from "./formControls.module.css"

const FormControl = ({input,meta,child,...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}

        </div>
    )
}

export const Input = (props) => {
    const {input,meta,child,...restProps} = props;
    const hasError = meta.touched && meta.error;
    return (
        <FormControl {...props}><input {...input} {...restProps}></input></FormControl>
    )
}