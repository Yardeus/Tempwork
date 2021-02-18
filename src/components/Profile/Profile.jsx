import React from "react";
import {NavLink} from "react-router-dom";
import s from "../Employee/List/List.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/formsControl";
import {setEditProfileMode} from "../../redux/profile-reducer";
import moment from "moment";
//test
let EditProfileForm = (props) => {
    const {handleSubmit} = props;
    debugger
    return (
        <form onSubmit={handleSubmit}>
            {props.type === "employer" ? props.profileData.map(p => <div>
                <div>
                    <Field placeholder={p.Firstname} name={"Firstname"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.Surname} name={"Surname"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.Middle_Name} name={"Middle_Name"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.City} name={"City"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.Profession} name={"Profession"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.Description} name={"Description"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.Email} name={"Email"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.Sex} name={"Sex"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.Phone_Number} name={"Phone_Number"} component={Input}/>
                </div>
                <div>
                    <button type={"submit"}>Сохранить изменения
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        props.setEditProfileMode(false)
                    }}>Отменить
                    </button>
                </div>

            </div>) : props.profileData.map(p => <div>
                <div>
                    <Field placeholder={p.Firstname} name={"Firstname"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.Surname} name={"Surname"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.Middle_Name} name={"Middle_Name"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.Phone_Number} name={"Phone_Number"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.Organization_name} name={"Organization_name"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.Email} name={"Email"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={p.City} name={"City"} component={Input}/>
                </div>

                <div>
                    <button type={"submit"}>Сохранить изменения
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        props.setEditProfileMode(false)
                    }}>Отменить
                    </button>
                </div>

            </div>)}
        </form>
    )
}


const EditProfileReduxForm = reduxForm({form: 'editProfile'})(EditProfileForm)

let Profile = (props) => {



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

    return <div>
        {props.editProfileMode ? <div>
                <EditProfileReduxForm {...props} onSubmit={onSubmit} setEditProfileMode={props.setEditProfileMode}/>
            </div> :
            props.type === "employer" ? props.profileData.map(p => <div>

                <div>
                    Имя - {p.Firstname}
                </div>
                <div>
                    Фамилия - {p.Surname}
                </div>
                <div>
                    Отчество - {p.Middle_Name}
                </div>
                <div>
                    Пол - {p.Sex}
                </div>
                <div>
                    Город - {p.City}
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
                <div>
                    Профессия - {p.Profession}
                </div>
                <div>
                    Краткое описание - {p.Description}
                </div>
                <div className={s.btn}>
                    <NavLink to={"/my-vacancy"}>Мои вакансии</NavLink>
                </div>
                <div className={s.btn}>
                    <NavLink to={"/feedback"}>Мои отзывы</NavLink>
                </div>
                <div className={s.btn}>
                    <button onClick={() => {
                        props.setEditProfileMode(true)
                    }}>Редактировать профиль
                    </button>
                </div>
                <div className={s.btn}>
                    <NavLink to={"/employee"}>
                        <button onClick={() => {
                            props.logOut()
                        }}>Выйти с аккаунта
                        </button>
                    </NavLink>
                </div>

            </div>) : props.profileData.map(p => <div>

                <div>
                    Имя - {p.Firstname}
                </div>
                <div>
                    Фамилия - {p.Surname}
                </div>
                <div>
                    Отчество - {p.Middle_Name}
                </div>
                <div>
                    Город - {p.City}
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
                    Название организации - {p.Organization_name}
                </div>
                <div className={s.btn}>
                    <NavLink to={"/my-vacancy"}>Мои вакансии</NavLink>
                </div>
                <div className={s.btn}>
                    <NavLink to={"/feedback"}>Мои отзывы</NavLink>
                </div>
                <div className={s.btn}>
                    <button onClick={() => {
                        props.setEditProfileMode(true)
                    }}>Редактировать профиль
                    </button>
                </div>
                <div className={s.btn}>
                    <NavLink to={"/employee"}>
                        <button onClick={() => {
                            props.logOut()
                        }}>Выйти с аккаунта
                        </button>
                    </NavLink>
                </div>

            </div>)

        }
    </div>
}

export default Profile;


