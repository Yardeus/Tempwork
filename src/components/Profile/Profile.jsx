import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import s from "./Profile.module.css";
import {Field, reduxForm} from "redux-form";
import {Button, Input, renderRadio} from "../common/formsControl";
import {setEditProfileMode} from "../../redux/profile-reducer";
import moment from "moment";
import {email, format, length, numericality, required} from "redux-form-validators";
import baseAvatar from "../../server/avatars/base_avatar.jpg"
import MessagesContainer from "./Messages/MessagesContainer";

class EditProfileForm extends React.Component {


    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                {this.props.type === "employer" ? this.props.profileData.map(p => <div className={s.info}>
                    <div align={"center"}>
                        <div>
                            <span>Имя</span>
                            <Field placeholder={p.Firstname} name={"Firstname"} component={Input}
                                   validate={[length({max: 45}), format({
                                       with: /^[а-я]+$/i,
                                       msg: "Используйте только буквы русского алфавита ", allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Фамилия</span>
                            <Field placeholder={p.Surname} name={"Surname"} component={Input}
                                   validate={[length({max: 45}), format({
                                       with: /^[а-я]+$/i,
                                       msg: "Используйте только буквы русского алфавита ", allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Отчество</span>
                            <Field placeholder={p.Middle_Name} name={"Middle_Name"} component={Input}
                                   validate={[length({max: 45}), format({
                                       with: /^[а-я]+$/i,
                                       msg: "Используйте только буквы русского алфавита ", allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Город</span>
                            <Field placeholder={p.City} name={"City"} component={Input}
                                   validate={[format({
                                       with: /^[а-я]+$/i,
                                       msg: "Используйте только буквы русского алфавита", allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Профессия</span>
                            <Field placeholder={p.Profession} name={"Profession"} component={Input}
                                   validate={[length({max: 45}), format({
                                       with: /^[а-я]+$/i,
                                       msg: "Используйте только буквы русского алфавита ", allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Номер телефона</span>
                            <Field placeholder={p.Phone_Number} name={"Phone_Number"} component={Input}
                                   validate={[length({
                                       is: 11,
                                       msg: "Введите корректный номер. Пример - 8XXXYYYHHII", allowBlank: true
                                   }), numericality({int: true, allowBlank: true})]}/>
                        </div>
                        <div>
                            <span>Электронная почта</span>
                            <Field placeholder={p.Email} name={"Email"} component={Input}
                                   validate={[email({
                                       msg: "Введите корректный адрес. Пример: tempwork@mail.ru",
                                       allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Резюме</span>
                            <Field placeholder={p.Description} name={"Description"} component={Input}
                                   validate={[length({max: 500})]}/>
                        </div>


                        <div>

                            <Field name="sex" component={renderRadio} type="radio"
                            />

                        </div>

                        <div>
                            <Button type={"submit"}>Сохранить изменения
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => {
                                this.props.setEditProfileMode(false)
                            }}>Отменить
                            </Button>
                        </div>
                    </div>


                </div>) : this.props.profileData.map(p => <div className={s.info}>
                    <div align={"center"}>
                        <div>
                            <span>Имя</span>
                            <Field placeholder={p.Firstname} name={"Firstname"} component={Input}
                                   validate={[length({max: 45}), format({
                                       with: /^[а-я]+$/i,
                                       msg: "Используйте только буквы русского алфавита ", allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Фамилия</span>
                            <Field placeholder={p.Surname} name={"Surname"} component={Input}
                                   validate={[length({max: 45}), format({
                                       with: /^[а-я]+$/i,
                                       msg: "Используйте только буквы русского алфавита ", allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Отчество</span>
                            <Field placeholder={p.Middle_Name} name={"Middle_Name"} component={Input}
                                   validate={[length({max: 45}), format({
                                       with: /^[а-я]+$/i,
                                       msg: "Используйте только буквы русского алфавита ", allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Номер телефона</span>
                            <Field placeholder={p.Phone_Number} name={"Phone_Number"} component={Input}
                                   validate={[length({
                                       is: 11,
                                       msg: "Введите корректный номер. Пример - 8XXXYYYHHII", allowBlank: true
                                   }), numericality({int: true, allowBlank: true})]}/>
                        </div>
                        <div>
                            <span>Название организации</span>
                            <Field placeholder={p.Organization_name} name={"Organization_name"} component={Input}
                                   validate={[format({
                                       with: /^[а-яa-z0-9]+$/i,
                                       msg: "Используйте только буквы русского,латинского алфавита, а также цифры от 0 до 9 ",
                                       allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Электронная почта</span>
                            <Field placeholder={p.Email} name={"Email"} component={Input}
                                   validate={[email({
                                       msg: "Введите корректный адрес. Пример: tempwork@mail.ru",
                                       allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Город</span>
                            <Field placeholder={p.City} name={"City"} component={Input}
                                   validate={[format({
                                       with: /^[а-я]+$/i,
                                       msg: "Используйте только буквы русского алфавита", allowBlank: true
                                   })]}/>
                        </div>

                        <div>
                            <Button type={"submit"}>Сохранить изменения
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => {
                                this.props.setEditProfileMode(false)
                            }}>Отменить
                            </Button>
                        </div>
                    </div>


                </div>)}
            </form>
        )
    }
}


const EditProfileReduxForm = reduxForm({form: 'editProfile'})(EditProfileForm)



let Profile = (props) => {
debugger
    let [profileMode,setProfileMode] = useState("default");

    /*let SetDefaultProfileMode = (props) => {
        return <div className={s.text}>

            <div className={s.btn}>
                <Button onClick={() => {setProfileMode("default")}}>Назад
                </Button>
            </div>
        </div>
    }*/

    const avatarSelected = (e) => {
        if (e.target.files.length) {
            props.saveAvatar("employer",e.target.files[0],props.userId)
        }
    }

    const onSubmit = (formData) => {
        if (setEditProfileMode) {
            let data = {}
            if (props.type === "employer") {
                props.profileData.map(v => {
                    data.idUser = props.userId
                    if (!formData.Firstname) {
                        data.Firstname = v.Firstname
                    } else {
                        data.Firstname = formData.Firstname
                    }
                    if (!formData.Surname) {
                        data.Surname = v.Surname
                    } else {
                        data.Surname = formData.Surname
                    }
                    if (!formData.Middle_Name) {
                        data.Middle_Name = v.Middle_Name
                    } else {
                        data.Middle_Name = formData.Middle_Name
                    }
                    if (!formData.City) {
                        data.City = v.City
                    } else {
                        data.City = formData.City
                    }
                    if (!formData.Birthday) {
                        data.Birthday = v.Birthday
                    } else {
                        data.Birthday = formData.Birthday
                    }
                    if (!formData.Profession) {
                        data.Profession = v.Profession
                    } else {
                        data.Profession = formData.Profession
                    }
                    if (!formData.Description) {
                        data.Description = v.Description
                    } else {
                        data.Description = formData.Description
                    }
                    if (!formData.Email) {
                        data.Email = v.Email
                    } else {
                        data.Email = formData.Email
                    }
                    if (!formData.Sex) {
                        data.Sex = v.Sex
                    } else {
                        data.Sex = formData.Sex
                    }
                    if (!formData.Birthday) {
                        data.Phone_Number = v.Phone_Number
                    } else {
                        data.Phone_Number = formData.Phone_Number
                    }

                })
            } else if (props.type === "employee") {
                props.profileData.map(v => {
                    data.idUser = props.userId
                    if (!formData.Firstname) {
                        data.Firstname = v.Firstname
                    } else {
                        data.Firstname = formData.Firstname
                    }
                    if (!formData.Surname) {
                        data.Surname = v.Surname
                    } else {
                        data.Surname = formData.Surname
                    }
                    if (!formData.Middle_Name) {
                        data.Middle_Name = v.Middle_Name
                    } else {
                        data.Middle_Name = formData.Middle_Name
                    }
                    if (!formData.Organization_name) {
                        data.Organization_name = v.Organization_name
                    } else {
                        data.Organization_name = formData.Organization_name
                    }
                    if (!formData.Phone_Number) {
                        data.Phone_Number = v.Phone_Number
                    } else {
                        data.Phone_Number = formData.Phone_Number
                    }
                    if (!formData.Email) {
                        data.Email = v.Email
                    } else {
                        data.Email = formData.Email
                    }
                    if (!formData.City) {
                        data.City = v.City
                    } else {
                        data.City = formData.City
                    }
                })
            }

            props.updateData(props.type, data)
            props.setEditProfileMode(false)
        }

    }

    switch (profileMode) {
        case "messages":
            debugger
            return <div>
                {/*<SetDefaultProfileMode />*/}
                <MessagesContainer />
            </div>

        case "default":
            debugger
            return <div className={s.text}>
                {props.editProfileMode ? <div>
                        <EditProfileReduxForm {...props} onSubmit={onSubmit} setEditProfileMode={props.setEditProfileMode}/>
                    </div> :
                    props.type === "employer" ? props.profileData.map(p => <div className={s.main}>
                        <div className={s.info}>

                            <div className={s.avatar}>
                                <img src={`http://localhost:8080/avatars/${p.Avatar}` || baseAvatar} height="200" width="200"/>
                                {p.idEmployer === props.userId ? <input type={"file"} onChange={avatarSelected}/> : null}
                            </div>
                            <div>

                                {p.Surname} {p.Firstname} {p.Middle_Name}
                            </div>
                            <div>
                                {p.Profession}
                            </div>
                            <div>
                                {p.Sex}
                            </div>
                            <div>
                                {p.City}
                            </div>
                            <div>
                                Номер телефона - {p.Phone_Number}
                            </div>
                            <div>
                                Электронная почта - {p.Email}
                            </div>
                            <div>
                                Дата регистрации - {moment(p.Date_Registration).format('L')}
                            </div>
                            <div>
                                День рождения - {moment(p.Birthday).format('L')}
                            </div>
                            <span>Описание</span>
                            <div>


                                {p.Description}

                            </div>
                        </div>
                        <div className={s.nav}>
                            <div className={s.btn}>
                                <NavLink to={"/my-vacancy"}><Button>Мои отклики</Button> </NavLink>
                            </div>
                            <div className={s.btn}>
                                <NavLink to={"/my-works"}><Button>Моя занятость</Button></NavLink>
                            </div>
                            <div className={s.btn}>
                                <NavLink to={"/feedback"}><Button>Мои отзывы</Button></NavLink>
                            </div>
                            <div className={s.btn}>
                                <Button onClick={() => {
                                    setProfileMode("messages")
                                }}>Сообщения
                                </Button>
                            </div>

                            <div className={s.btn}>
                                <Button onClick={() => {
                                    props.setEditProfileMode(true)
                                }}>Редактировать профиль
                                </Button>
                            </div>
                            <div className={s.btn}>
                                <NavLink to={"/employee"}>
                                    <Button onClick={() => {
                                        props.logOut()
                                    }}>Выйти с аккаунта
                                    </Button>
                                </NavLink>
                            </div>
                        </div>


                    </div>) : props.profileData.map(p => <div className={s.main}>
                        <div className={s.info}>
                            <div>
                                {p.Surname} {p.Firstname} {p.Middle_Name}
                            </div>
                            <div>
                                {p.City}
                            </div>
                            <div>
                                Название организации - {p.Organization_name}
                            </div>
                            <div>
                                Дата регистрации - {moment(p.Date_Registration).format('L')}
                            </div>
                            <div>
                                Номер телефона - {p.Phone_Number}
                            </div>
                            <div>
                                Электронная почта - {p.Email}
                            </div>


                        </div>
                        <div className={s.nav}>
                            <div className={s.btn}>
                                <NavLink to={"/my-vacancy"}><Button>
                                    Мои вакансии
                                </Button> </NavLink>
                            </div>
                            <div className={s.btn}>
                                <NavLink to={"/feedback"}><Button>Мои отзывы</Button> </NavLink>
                            </div>
                            <div className={s.btn}>
                                <Button onClick={() => {
                                    props.setEditProfileMode(true)
                                }}>Редактировать профиль
                                </Button>
                            </div>

                            <div className={s.btn}>
                                <NavLink to={"/employee"}>
                                    <Button onClick={() => {
                                        props.logOut()
                                    }}>Выйти с аккаунта
                                    </Button>
                                </NavLink>
                            </div>
                        </div>


                    </div>)

                }
            </div>
    }

}

export default Profile;


