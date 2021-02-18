import React from "react";
import s from './Login.module.css'
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../utils/validators/validators";
import {Input} from "../common/formsControl";
import {NavLink, Redirect} from "react-router-dom";

const maxLength10 = maxLength(10);

const LoginForm = (props) => {

   const  { handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <label>
                    <Field name="type" component={Input} type="radio" value="employer" validate={[required]}/>{' '}
                    Соискатель
                </label>
                <label>
                    <Field name="type" component={Input} type="radio" value="employee" validate={[required]}/>{' '}
                    Работодатель
                </label>
            </div>
            <div>
                <button type="submit" disabled={props.loginInProgress}>Log in</button>
            </div>
            <div>
                <Field component={"input"} name={"rememberMe"} type={"checkbox"}/> remember me
            </div>
            <div>
                <h2>Зарегистироваться как</h2>
            </div>
            <div>
                <NavLink to={"/register-employer"}><button>Соискаталь</button></NavLink>

                <NavLink to={"/register-employee"}><button>Работодатель</button></NavLink>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    if (props.isAuth) return <Redirect to={'/profile'}/>
    const onSubmit = (formData) => {
        //disabled = {props.loginInProgress}
        console.log(formData.login)
        props.EmployeeSignIn(formData.login, formData.password, formData.type)
    }

    return (
        <div className={s.login}>
            <h1>Вход в личный кабинет</h1>
            <LoginReduxForm onSubmit={onSubmit} loginInProgress={props.loginInProgress}/>

        </div>
    )
}
export default Login;