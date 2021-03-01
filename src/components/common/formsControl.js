import React from "react";
import s from "./formControls.module.css"
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

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

export const Button = (props) => {
    const {input,meta,child,...restProps} = props;
    return (
        <div className={s.btn}>
            <button {...props}></button>
        </div>

    )
}

export const renderTextField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        <label>{label}</label>
        <div>
            <TextField placeholder={label} {...input}  type={type}/>
            {/* ошибка для поля*/}
            {touched && ((error && <div>{error}</div>))}
        </div>
    </div>
);
export const renderTextFieldMultiLine = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        <label>{label}</label>
        <div>
            <TextField placeholder={label} {...input} multiline
                       rows={4} type={type}/>
            {/* ошибка для поля*/}
            {touched && ((error && <div>{error}</div>))}
        </div>
    </div>
);
export const renderRadio = ({input, label, type, meta: {touched, error, warning}}) => (
    <div className={s.text}>
        <span>Ваш пол</span>
        <RadioGroup type={type} {...input} >
            <div align={"center"}>
                <FormControlLabel value="Мужской" control={<Radio/>} label="Мужской"/>
                <FormControlLabel value="Женский" control={<Radio/>} label="Женский"/>
                {touched && ((error && <div>{error}</div>))}
            </div>

        </RadioGroup>

    </div>
);