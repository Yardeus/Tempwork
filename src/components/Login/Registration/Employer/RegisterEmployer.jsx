import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../../../utils/validators/validators";
import {Input} from "../../../common/formsControl";
import {NavLink} from "react-router-dom";

const maxLength20 = maxLength(20);

const RegisterEmployerForm = (props) => {

    const  { handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Логин"} name={"login"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <Field placeholder={"Пароль"} name={"password"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <Field placeholder={"Повторите пароль"} name={"passwordTwo"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <Field placeholder={"Имя"} name={"firstName"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <Field placeholder={"Фамилия"} name={"surname"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <Field placeholder={"Отчество"} name={"middleName"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <Field placeholder={"Номер телефона"} name={"phoneNumber"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <Field placeholder={"Электронная почта"} name={"email"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <Field placeholder={"День рождения"} name={"birthday"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <Field placeholder={"Профессия"} name={"profession"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <Field placeholder={"Краткая характеристика себя"} name={"description"} component={Input} validate={[required,maxLength20]}/>
            </div>
            <div>
                <label>
                    <Field name="sex" component={Input} type="radio" value="Мужской" validate={[required]}/>{'Мужской'}
                </label>
                <label>
                    <Field name="sex" component={Input} type="radio" value="Женский" validate={[required]}/>{'Женский'}
                </label>
            </div>
            <div>
                <button type="submit" disabled={props.loginInProgress}>Зарегистироваться</button>
            </div>
        </form>
    )
}

const RegisterEmployerReduxForm = reduxForm({form: 'registerEmployer'})(RegisterEmployerForm)

const RegisterEmployer = (props) => {
    const onSubmit = (formData) => {
        console.log(formData.login)
        let data = {
            first_name: formData.firstName,
            surname: formData.surname,
            middle_name: formData.middleName,
            phone_number: formData.phoneNumber,
            e_mail: formData.email,
            login: formData.login,
            password: formData.password,
            birthday: formData.birthday,
            profession: formData.profession,
            description: formData.description,
            sex: formData.sex,

        }
        props.SignUp("employer",data)
    }

    return (
        <div>
            <h1>Регистрация соискателя</h1>
            <RegisterEmployerReduxForm onSubmit={onSubmit} loginInProgress={props.loginInProgress}/>

        </div>
    )
}
export default RegisterEmployer;