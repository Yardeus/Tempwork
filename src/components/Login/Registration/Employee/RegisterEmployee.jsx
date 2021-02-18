import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../../../utils/validators/validators";
import {Input} from "../../../common/formsControl";
import {NavLink} from "react-router-dom";

const maxLength10 = maxLength(10);

const RegisterEmployerForm = (props) => {

    const  { handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Логин"} name={"login"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Пароль"} name={"password"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Повторите пароль"} name={"passwordTwo"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Имя"} name={"firstName"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Фамилия"} name={"surname"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Отчество"} name={"middleName"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Номер телефона"} name={"phoneNumber"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Электронная почта"} name={"email"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Название организации"} name={"orgName"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Город"} name={"city"} component={Input} validate={[required,maxLength10]}/>
            </div>

            <div>
                <button type="submit" disabled={props.loginInProgress}>Зарегистироваться</button>
            </div>
        </form>
    )
}

const RegisterEmployerReduxForm = reduxForm({form: 'registerEmployer'})(RegisterEmployerForm)

const RegisterEmployee = (props) => {
    const onSubmit = (formData) => {
        console.log(formData.login)
        let data = {
            organization_name: formData.orgName,
            first_name: formData.firstName,
            surname: formData.surname,
            middle_name: formData.middleName,
            city: formData.city,
            phone_number: formData.phoneNumber,
            e_mail: formData.email,
            login: formData.login,
            password: formData.password
        }
        props.SignUp("employee",data)
    }

    return (
        <div>
            <h1>Регистрация работодателя</h1>
            <RegisterEmployerReduxForm onSubmit={onSubmit} loginInProgress={props.loginInProgress}/>

        </div>
    )
}
export default RegisterEmployee;