import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import s from "./Profile.module.css";
import {Field, reduxForm} from "redux-form";
import {Input, renderRadio} from "../common/formsControl";
import {setEditProfileMode} from "../../redux/profile-reducer";
import moment from "moment";
import {email, format, length, numericality, required} from "redux-form-validators";
import baseAvatar from "../../server/avatars/base_avatar.jpg"
import MessagesContainer from "./Messages/MessagesContainer";
import SendReport from "../common/SendReport/SendReport";
import SendReportContainer from "../common/SendReport/SendReportContainer";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
/*
import PhotoCamera from '@material-ui/icons/PhotoCamera';*/
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from "@material-ui/core/Button";
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import WcIcon from '@material-ui/icons/Wc';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import MailOutlineIcon from '@material-ui/icons/MailOutline';


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

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
    input: {
        display: 'none',
        color: "blue"
    },
}));

const EditProfileReduxForm = reduxForm({form: 'editProfile'})(EditProfileForm)


let Profile = (props) => {
    const classes = useStyles();

    const employerAvatarSelected = (e) => {
        if (e.target.files.length) {
            props.saveAvatar("employer", e.target.files[0], props.userId,props.token)
        }
    }
    const employeeAvatarSelected = (e) => {
        if (e.target.files.length) {
            props.saveAvatar("employee", e.target.files[0], props.userId,props.token)
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

            props.updateData(props.type, data,props.token)
            props.setEditProfileMode(false)
        }

    }

    switch (props.profileMode) {
        case "messages":
            return <div>
                {/*<SetDefaultProfileMode />*/}
                <MessagesContainer/>
            </div>

        case "default":
            return <div>
                {props.editProfileMode ? <div>
                        <EditProfileReduxForm {...props} onSubmit={onSubmit} setEditProfileMode={props.setEditProfileMode}/>
                    </div> :
                    props.type === "employer" ? props.profileData.map(p => <div className={s.main}>


                        <div className={classes.root}>
                            <div className={s.avatar}>
                                {p.Avatar ? <Avatar variant="rounded" className={classes.large} alt="avatar"
                                                    src={`http://localhost:8080/avatars/${p.Avatar}`}/> :
                                    <Avatar variant="rounded" className={classes.large} alt="avatar" src={baseAvatar}/>}
                            </div>
                        </div>
                        <div className={s.uploadAvatar}>
                            {p.idEmployer === props.userId ? <div className={classes.root}>
                                <div>
                                    <input accept="image/*" onChange={employerAvatarSelected} className={classes.input}
                                           id="icon-button-file" type="file"/>

                                    <label htmlFor="icon-button-file">
                                        <Button fullWidth variant="contained" color="white" component="span">
                                            Обновить фото
                                        </Button>
                                    </label>
                                </div>

                            </div> : null}
                        </div>
                        <div className={s.info}>
                            <div className={s.text}>
                                <div className={s.name}>
                                    {p.Surname} {p.Firstname} {p.Middle_Name} <SentimentSatisfiedAltIcon
                                    color={"white"}/>{p.rank}
                                </div>
                                <div className={s.item}>
                                    <WcIcon/> {p.Sex}
                                </div>
                                <div>
                                    <span className={s.item}>Дата рождения:</span> {moment(p.Birthday).format('L')}
                                </div>
                                <div className={s.item}>
                                    <span>Город:</span> {p.City}
                                </div>
                                <div className={s.item}>
                                    <span>Желаемая занятость:</span> {p.Profession}
                                </div>
                                <div className={s.item}>
                                    <span>Контактные данные</span>
                                </div>
                                <div className={s.item}>
                                    <PhoneInTalkIcon/> {p.Phone_Number}
                                </div>
                                <div className={s.item}>
                                    <MailOutlineIcon/> {p.Email}
                                </div>
                                <div className={s.item}>
                                    Дата регистрации - {moment(p.Date_Registration).format('L')}
                                </div>
                            </div>
                        </div>
                        <div className={s.desc}>
                            <div className={s.bottom}>

                                <div className={s.descTitle}>
                                    Описание
                                </div>
                                <div className={s.descText}>
                                    {p.Description}
                                </div>
                            </div>
                        </div>
                        <div className={s.nav}>

                            <div className={s.btn}>
                                <NavLink to={"/my-vacancy"}><Button fullWidth variant="contained">Мои отклики</Button>
                                </NavLink>
                            </div>
                            <div className={s.btn}>
                                <NavLink to={"/my-works"}><Button fullWidth variant="contained">Моя
                                    занятость</Button></NavLink>
                            </div>
                            <div className={s.btn}>
                                <NavLink to={"/feedback"}><Button fullWidth variant="contained">Мои
                                    отзывы</Button></NavLink>
                            </div>
                            <div className={s.btn}>
                                <Button fullWidth variant="contained" onClick={() => {
                                    props.setProfileMode("messages")
                                }}>Сообщения
                                </Button>
                            </div>
                            <div className={s.btn}>
                                <Button fullWidth variant="contained" onClick={() => {
                                    props.setEditProfileMode(true)
                                }}>Редактировать профиль
                                </Button>
                            </div>
                            <div className={s.btn}>
                                <NavLink to={"/employee"}>
                                    <Button fullWidth variant="contained" onClick={() => {
                                        props.logOut()
                                    }}>Выйти с аккаунта
                                    </Button>
                                </NavLink>
                            </div>
                        </div>


                    </div>) : props.profileData.map(p => <div className={s.main}>

                        <div className={classes.root}>
                            <div className={s.avatar}>
                                {p.Avatar ? <Avatar variant="rounded" className={classes.large} alt="avatar"
                                                    src={`http://localhost:8080/avatars/${p.Avatar}`}/> :
                                    <Avatar variant="rounded" className={classes.large} alt="Remy Sharp"
                                            src={baseAvatar}/>}
                            </div>
                        </div>

                        {p.idEmployee === props.userId ? <div className={classes.root}>

                            <input accept="image/*" onChange={employeeAvatarSelected} className={classes.input}
                                   id="icon-button-file" type="file"/>
                            <label htmlFor="icon-button-file">
                                <Button fullWidth variant="contained" color="white" component="span">
                                    Обновить фото
                                </Button>
                            </label>
                        </div> : null}

                        <div className={s.info}>
                            <div className={s.text}>
                                <div className={s.name}>
                                    {p.Surname} {p.Firstname} {p.Middle_Name} <SentimentSatisfiedAltIcon
                                    color={"white"}/> {p.rank}
                                </div>
                                <div className={s.item}>
                                    <span>Город:</span> {p.City}
                                </div>
                                <div className={s.item}>
                                    <span>Название организации: </span> {p.Organization_name}
                                </div>
                                <div className={s.item}>
                                    <span>Дата регистрации: </span> {moment(p.Date_Registration).format('L')}
                                </div>
                                <div className={s.item}>
                                    <span>Контактные данные</span>
                                </div>
                                <div className={s.item}>
                                    <PhoneInTalkIcon/> {p.Phone_Number}
                                </div>
                                <div className={s.item}>
                                    <MailOutlineIcon/> {p.Email}
                                </div>
                            </div>

                        </div>
                        <div className={s.nav}>
                            <div className={s.btn}>
                                <NavLink to={"/my-vacancy"}><Button fullWidth variant="contained">
                                    Мои вакансии
                                </Button> </NavLink>
                            </div>
                            <div className={s.btn}>
                                <NavLink to={"/feedback"}><Button fullWidth variant="contained">Мои отзывы</Button>
                                </NavLink>
                            </div>
                            <div className={s.btn}>
                                <Button fullWidth variant="contained" onClick={() => {
                                    props.setEditProfileMode(true)
                                }}>Редактировать профиль
                                </Button>
                            </div>
                            <div className={s.btn}>
                                <Button fullWidth variant="contained" onClick={() => {
                                    props.setProfileMode("messages")
                                }}>Сообщения
                                </Button>
                            </div>


                            <div className={s.btn}>
                                <NavLink to={"/employee"}>
                                    <Button fullWidth variant="contained" onClick={() => {
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


