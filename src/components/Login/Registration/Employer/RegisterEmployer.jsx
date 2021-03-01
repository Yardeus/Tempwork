import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, Input} from "../../../common/formsControl";
import {confirmation, date, email, format, length, numericality, required} from "redux-form-validators";
import s from "./RegisterEmployer.module.css";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";


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
                    <Field placeholder={"Пароль"} name={"password"} type={"password"} component={this.renderTextField}
                           validate={[required({msg: "Введите ваш Пароль"}), length({max: 45}), format({
                               with: /^[a-z0-9]+$/i,
                               msg: "Используйте только буквы латинского алфавита и цифры от 0 до 9"
                           })]}/>
                </div>
                <div>
                    <span>Повторите пароль</span>
                    <Field placeholder={"Повторите пароль"} name={"passwordTwo"} type={"password"} component={this.renderTextField}
                           validate={[required({msg: "Повторите пароль"}),

                               format({
                                   with: /^[a-z0-9]+$/i,
                                   msg: "Используйте только буквы латинского алфавита и цифры от 0 до 9"
                               }), length({max: 45}),
                               confirmation({field: 'password', msg: "Пароли не совпадают"})]}/>
                </div>
                <div>
                    <span>Имя</span>
                    <Field placeholder={"Имя"} name={"firstName"} component={this.renderTextField}
                           validate={[required({msg: "Введите вашe имя"}), length({max: 45}), format({
                               with: /^[а-я]+$/i,
                               msg: "Используйте только буквы русского алфавита "
                           })]}/>
                </div>
                <div>
                    <span>Фамилия</span>
                    <Field placeholder={"Фамилия"} name={"surname"} component={this.renderTextField}
                           validate={[required({msg: "Введите вашу фамилию"}), length({max: 45}), format({
                               with: /^[а-я]+$/i,
                               msg: "Используйте только буквы русского алфавита "
                           })]}/>
                </div>
                <div>
                    <span>Отчество</span>
                    <Field placeholder={"Отчество"} name={"middleName"} component={this.renderTextField}
                           validate={[required({msg: "Введите вашe отчество"}), length({max: 45}), format({
                               with: /^[а-я]+$/i,
                               msg: "Используйте только буквы русского алфавита "
                           })]}/>
                </div>
                <div>
                    <span>Номер телефона</span>
                    <Field placeholder={"Номер телефона"} name={"phoneNumber"} component={this.renderTextField}
                           validate={[required({msg: "Введите ваш номер телефона"}), length({
                               is: 11,
                               msg: "Введите корректный номер. Пример - 8XXXYYYHHII"
                           }), numericality({int: true})]}/>
                </div>
                <div>
                    <span>Электронная почта</span>
                    <Field placeholder={"Электронная почта"} name={"email"} component={this.renderTextField}
                           validate={[required({msg: "Введите вашу электронную почту"}), email({msg: "Введите корректный адрес. Пример: tempwork@mail.ru"})]}/>
                </div>
                <div>
                    <span>Дата рождения</span>
                    <Field placeholder={"День рождения"} name={"birthday"} type={"date"} component={this.renderTextField}
                           validate={[required({msg: "Введите дату вашего рождения"}), date({
                               format: 'yyyy-mm-dd',
                               msg: 'Введите в таком формате: гггг-мм-дд'
                           })]}/>
                </div>
                <div>
                    <span>Профессия</span>
                    <Field placeholder={"Профессия"} name={"profession"} component={this.renderTextField}
                           validate={[required({msg: "Введите вашу профессию"}), length({max: 45}), format({
                               with: /^[а-я]+$/i,
                               msg: "Используйте только буквы русского алфавита "
                           })]}/>
                </div>
                <div>
                    <span>Кратко о себе</span>
                    <Field placeholder={"Краткая характеристика себя"} name={"description"} component={this.renderTextFieldMultiLine}
                           validate={[required({msg: "Введите краткое описание себя"}), length({max: 500})]}/>
                </div>
                <div>
                    <Field name={"sex"} component={this.renderRadio}
                           validate={[required({msg: "Выберите один из вариантов"})]}/>

                </div>
                <div>
                    <Button type="submit" disabled={this.props.loginInProgress}>Зарегистироваться</Button>
                </div>
            </form>
        )
    }
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
        props.SignUp("employer", data)
    }

    return (
        <div  className={s.reg}>
            <div align="center" className={s.text}>
                <h1>Регистрация соискателя</h1>
                <RegisterEmployerReduxForm onSubmit={onSubmit} loginInProgress={props.loginInProgress}/>
            </div>
        </div>
    )
}
export default RegisterEmployer;