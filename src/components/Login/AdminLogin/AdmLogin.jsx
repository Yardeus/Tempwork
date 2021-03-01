import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, Input} from "../../common/formsControl";
import {NavLink, Redirect} from "react-router-dom";

import s from './AdmLogin.module.css'
import TextField from "@material-ui/core/TextField";
import {format, length, required} from "redux-form-validators";


class AdmLoginForm extends React.Component {
    renderTextField = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            <label>{label}</label>
            <div>
                <TextField {...input} placeholder={label} type={type}/>
                {/* ошибка для поля*/}
                {touched && ((error && <div>{error}</div>))}
            </div>
        </div>
    );
    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Логин</span>
                    <Field placeholder={"Login"} name={"login"} component={this.renderTextField} validate={[length({max: 45}), format({
                        with: /^[a-z0-9]+$/i,
                        msg: "Используйте только буквы латинского алфавита и цифры от 0 до 9"
                    })]}/>
                </div>
                <div>
                    <span>Пароль</span>
                    <Field placeholder={"Password"} name={"password"} type={"password"} component={this.renderTextField}
                           validate={[required({msg: "Введите ваш Пароль"}), length({max: 45}), format({
                               with: /^[a-z0-9]+$/i,
                               msg: "Используйте только буквы латинского алфавита и цифры от 0 до 9"
                           })]}/>
                </div>
                <div>
                    <Button type="submit">Войти</Button>
                </div>
            </form>
        )
    }
}

const LoginReduxForm = reduxForm({form: 'login'})(AdmLoginForm)

const AdmLogin = (props) => {
    if (props.isAuth) return <Redirect to={'/admin-panel'}/>
    const onSubmit = (formData) => {
        props.signIn("admin", formData.login, formData.password)
    }

    return (
        <div className={s.login}>
            <div align="center">
                <h1>Вход в личный кабинет администратора</h1>
                <LoginReduxForm onSubmit={onSubmit} loginInProgress={props.loginInProgress}/>
            </div>


        </div>
    )
}
export default AdmLogin;