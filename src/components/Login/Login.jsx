import React from "react";
import s from './Login.module.css'
import {Field, reduxForm} from "redux-form";
import {Button, Input} from "../common/formsControl";
import {NavLink, Redirect} from "react-router-dom";
import {length, required, format} from "redux-form-validators";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";


class LoginForm extends React.Component {

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
    renderRadio = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            <span>Войти как</span>
            <RadioGroup type={type} {...input}>
                <div align={"center"}>
                    <FormControlLabel value="employer" control={<Radio/>} label="Соискатель"/>
                    <FormControlLabel value="employee" control={<Radio/>} label="Работодатель"/>
                </div>

            </RadioGroup>
            {touched && ((error && <div>{error}</div>))}
        </div>
    );

    render() {
        const {handleSubmit, pristine, reset, submitting, classes} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className={s.text}>
                    <span>Логин</span>
                    <Field name={"login"} component={this.renderTextField}
                           validate={[length({max: 45}), format({
                               with: /^[a-z0-9]+$/i,
                               msg: "Используйте только буквы латинского алфавита и цифры от 0 до 9"
                           })]}/>
                </div>
                <div className={s.text}>
                    <span>Пароль</span>
                    <Field name={"password"} type={"password"} component={this.renderTextField}
                           validate={[required({msg: "Введите ваш Пароль"}), length({max: 45}), format({
                               with: /^[a-z0-9]+$/i,
                               msg: "Используйте только буквы латинского алфавита и цифры от 0 до 9"
                           })]}/>
                </div>
                <div>
                    <Field name={"type"} component={this.renderRadio}
                           validate={[required({msg: "Выберите один из вариантов"})]}/>

                </div>
                <div >
                    <Button type="submit" disabled={this.props.loginInProgress}>Авторизоваться</Button>
                </div>
                {this.props.message? <div>{this.props.message}</div> : null}
                <div className={s.text}>
                    <h3>или</h3>
                    <h2>Зарегистироваться как</h2>
                </div>
                <div className={s.reg} align={"center"}>
                    <div>
                        <NavLink to={"/register-employer"}>

                            <Button>Соискаталь</Button>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={"/register-employee"}>
                            <Button>Работодатель</Button>
                        </NavLink>
                    </div>

                </div>
            </form>
        )
    }


}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    if (props.isAuth) return <Redirect to={'/profile'}/>
    const onSubmit = (formData) => {
        console.log(formData.login)
        props.EmployeeSignIn(formData.login, formData.password, formData.type)
    }

    return (
        <div className={s.login}>
            <div align="center"  className={s.text}>
                <h1>Вход в личный кабинет</h1>
                <LoginReduxForm {...props} onSubmit={onSubmit} loginInProgress={props.loginInProgress}/>
            </div>


        </div>
    )
}
export default Login;