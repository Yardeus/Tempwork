import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../../utils/validators/validators";
import {Input} from "../../common/formsControl";
import {NavLink, Redirect} from "react-router-dom";

const maxLength20 = maxLength(20);

const AdmLoginForm = (props) => {

    const  { handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <button type="submit">Log in</button>
            </div>

        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(AdmLoginForm)

const AdmLogin = (props) => {
    if (props.isAuth) return <Redirect to={'/admin-panel'}/>
    const onSubmit = (formData) => {
        props.signIn("admin",formData.login, formData.password)
    }

    return (
        <div>
            <h1>Вход в личный кабинет администратора</h1>
            <LoginReduxForm onSubmit={onSubmit} loginInProgress={props.loginInProgress}/>

        </div>
    )
}
export default AdmLogin;