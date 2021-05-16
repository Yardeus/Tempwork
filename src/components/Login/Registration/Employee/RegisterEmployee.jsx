import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, Input} from "../../../common/formsControl";
import {NavLink} from "react-router-dom";
import {confirmation, email, format, length, numericality, required} from "redux-form-validators";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import s from "../Employer/RegisterEmployer.module.css";


class RegisterEmployerForm extends React.Component {

    renderTextField = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            <label>{label}</label>
            <div>
                <TextField placeholder={label} {...input}  type={type}/>
                {/* ошибка для поля*/}
                {touched && ((error && <div>{error}</div>))}
            </div>
        </div>
    );
    renderTextFieldMultiLine = ({input, label, type, meta: {touched, error, warning}}) => (
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
    renderRadio = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
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


    render() {


        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Логин</span>
                    <Field placeholder={"Логин"} name={"login"} component={this.renderTextField}
                           validate={[required({msg: "Введите ваш Логин"}), length({max: 45}), format({
                               with: /^[a-z0-9]+$/i,
                               msg: "Используйте только буквы латинского алфавита и цифры от 0 до 9"
                           })]}/>
                </div>
                <div>
                    <span>Пароль</span>
                    <Field name={"password"} type={"password"} component={this.renderTextField}
                           validate={[required({msg: "Введите ваш Пароль"}), length({max: 65}), format({
                               with: /^[a-z0-9]+$/i,
                               msg: "Используйте только буквы латинского алфавита и цифры от 0 до 9"
                           })]}/>
                </div>
                <div>
                    <span>Повторите пароль</span>
                    <Field type={"password"} name={"passwordTwo"} component={this.renderTextField}
                           validate={[required({msg: "Повторите пароль"}),
                               length({max: 45}),
                               format({
                                   with: /^[a-z0-9]+$/i,
                                   msg: "Используйте только буквы латинского алфавита и цифры от 0 до 9"
                               }),
                               confirmation({field: 'password', msg: "Пароли не совпадают"})]}/>
                </div>
                <div>
                    <span>Имя</span>
                    <Field name={"firstName"} component={this.renderTextField}
                           validate={[required({msg: "Введите вашe имя"}), length({max: 45}), format({
                               with: /^[а-я]+$/i,
                               msg: "Используйте только буквы русского алфавита "
                           })]}/>
                </div>
                <div>
                    <span>Фамилия</span>
                    <Field name={"surname"} component={this.renderTextField}
                           validate={[required({msg: "Введите вашу фамилию"}), length({max: 45}), format({
                               with: /^[а-я]+$/i,
                               msg: "Используйте только буквы русского алфавита "
                           })]}/>
                </div>
                <div>
                    <span>Отчество</span>
                    <Field name={"middleName"} component={this.renderTextField}
                           validate={[required({msg: "Введите вашe отчество"}), length({max: 45}), format({
                               with: /^[а-я]+$/i,
                               msg: "Используйте только буквы русского алфавита "
                           })]}/>
                </div>
                <div>
                    <span>Номер телефона</span>
                    <Field name={"phoneNumber"} component={this.renderTextField}
                           validate={[required({msg: "Введите ваш номер телефона"}), length({
                               is: 11,
                               msg: "Введите корректный номер. Пример - 8XXXYYYHHII"
                           }), numericality({int: true})]}/>
                </div>
                <div>
                    <span>Электронная почта</span>
                    <Field name={"email"} component={this.renderTextField}
                           validate={[required({msg: "Введите вашу электронную почту"}), email({msg: "Введите корректный адрес. Пример: tempwork@mail.ru"})]}/>
                </div>
                <div>
                    <span>Название организации</span>
                    <Field name={"orgName"} component={this.renderTextField}
                           validate={[required({msg: "Введите название вашей организации"}), format({
                               with: /^[а-яa-z0-9- ]+$/i,
                               msg: "Используйте только буквы русского,латинского алфавита, а также цифры от 0 до 9 "
                           })]}/>
                </div>
                <div>
                    <span>Город</span>
                    <Field name={"city"} component={this.renderTextField}
                           validate={[required({msg: "Введите ваш город"}), format({
                               with: /^[а-я- ]+$/i,
                               msg: "Используйте только буквы русского алфавита"
                           })]}/>
                </div>

                <div>
                    <Button type="submit" disabled={this.props.loginInProgress}>Зарегистироваться</Button>
                </div>
            </form>
        )
    }
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
        props.SignUp("employee", data)
    }

    return (
        <div  className={s.reg}>
            <div align={"center"}>
                <h1>Регистрация работодателя</h1>
                <RegisterEmployerReduxForm onSubmit={onSubmit} loginInProgress={props.loginInProgress}/>
            </div>


        </div>
    )
}
export default RegisterEmployee;