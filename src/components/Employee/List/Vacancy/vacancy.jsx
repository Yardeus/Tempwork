import React, {useEffect, useState} from "react";
import s from "./vacancy.module.css";
import {NavLink, Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Button, Input} from "../../../common/formsControl";
import moment from "moment";

import {length} from "redux-form-validators";
import TextField from "@material-ui/core/TextField";
import SendReportContainer from "../../../common/SendReport/SendReportContainer";

class VacancyForm extends React.Component {

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

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <Field placeholder={"Введите отзыв"} name={"feedback"} component={this.renderTextField}
                               validate={length({max: 500, msg: "Максимум 500 символов"})}/>
                    </div>
                    <div>
                        <button type="submit">Отправить отзыв</button>
                    </div>
                    <div>
                        <button onClick={() => {
                            this.props.setFeedbackMode(false)
                        }}>Отменить
                        </button>
                    </div>


                </div>
            </form>
        )
    }


}

const VacancyReduxForm = reduxForm({form: 'vacancy'})(VacancyForm)

const Vacancy = (props) => {
    let [addVacancyFavorite, setAddVacancyFavorite] = useState(false)
    let [delVacancyFavorite, setDelVacancyFavorite] = useState(false)

    props.oneVacancy.map(v => {
        if (v.Status === "Активно") {
            props.setIsVacancyClosed(false)
        } else {
            props.setIsVacancyClosed(true)
        }
    })


    const onSubmit = (formData) => {
        if (props.feedbackMode) {
            let data = {};
            props.oneVacancy.map(v => data = {

                idEmployee: v.idEmployee,
                idEmployer: props.userId,
                feedback: formData.feedback,
                idVacancy: v.idFind_Employer
            })

            console.log(formData)
            props.sendFeedbackEmployee(data)
            props.setFeedbackMode(false)
            props.setFeedbackSendMode(true)

        }


    }

     let [vacancyIsClosed, setVacancyIsClosed] = useState(props.isVacancyClosed)


    return (
        <div className={s.login}>
            <div>
                {
                    props.oneVacancy.map(v => <div className={s.vacancy}>
                            <div className={s.text + ' ' + s.main}>
                                {v.Profession} {v.Specialisation}. Оплата {v.Price} руб.
                            </div>
                            <div className={s.text}>
                                Рейтинг - {v.rank}
                            </div>
                            <div className={s.text}>
                                {v.Organization_name}
                            </div>

                            <div className={s.text}>
                                {moment(v.Start_Date).format('L')} - {moment(v.End_Date).format('L')}
                            </div>
                            <div className={s.text}>
                                <div>Описание работы</div>

                                {v.Description}
                            </div>
                            <div className={s.text}>
                                Требуемое количество человек: {v.Quantity}
                            </div>

                            <div className={s.text}>
                                {v.City}, {v.Adress}
                            </div>


                            <div className={s.text}>
                                График работы
                                <div>Начало дня - {moment(v.Start_Time, 'hh:mm:ss').format('LT')}</div>
                                <div>Конец дня - {moment(v.End_Time, 'hh:mm:ss').format('LT')}</div>
                            </div>
                            <div className={s.text}>
                                Тип занятости: {v.Type ? v.Type : "Не указано"}
                            </div>
                            <div className={s.text}>
                                Опыт: {v.Experience ? v.Experience : "Не указано"}
                            </div>
                            <div className={s.text}>
                                График: {v.Shedule ? v.Shedule : "Не указано"}
                            </div>
                            <div className={s.text}>
                                Электронная почта для связи {v.Email}
                            </div>
                            <div>
                                <NavLink to={"/employee"}>
                                    <Button>Вернуться</Button>
                                </NavLink>
                            </div>

                            {props.type === "employer" ? props.isResponded ? <div>Вы откликнулись</div> :
                                <div>
                                    <Button onClick={() => {
                                        props.onRespond(v.idFind_Employer)
                                    }}>Откликнуться
                                    </Button>
                                </div> : null}


                            {props.type === "admin" ? vacancyIsClosed ? <div>Вакансия закрыта</div> : <div>
                                <button onClick={() => {
                                    props.closeVacancyAdmin(v.idFind_Employer)
                                    setVacancyIsClosed(true)
                                }}>Закрыть вакансию(Admin)
                                </button>
                            </div> : null}
                            <div>
                                {props.isViewFeedback ? <div>
                                        <div>
                                            <Button onClick={() => {
                                                props.setIsViewFeedback(false)
                                            }}>Закрыть отзывы
                                            </Button>
                                        </div>
                                        <div>
                                            {props.feedbacks ? props.feedbacks.map(f => <div>
                                                <div className={s.name}>
                                                    {f.Surname} {f.Firstname} {f.Middle_Name}
                                                </div>
                                                <div className={s.item}>
                                                    {f.rank ? <div>
                                                        Мнение - {f.rank === "like" ?
                                                        <span>Хорошее</span> : f.rank === "dislike" ?
                                                            <span>Плохое</span> : <span>Нейтральное</span>}
                                                    </div> : null}
                                                    {f.feedback.length > 0 && f.feedback !== "undefined" && f.feedback !== "null" ?
                                                        <div>
                                                            Отзыв - {f.feedback}
                                                        </div> : null}

                                                </div>

                                            </div>) :  <div>Отзывов нет</div>
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <Button onClick={() => {
                                            props.getFeedbackEmployee(v.idEmployee)
                                        }}>
                                            Просмотреть отзывы о работодателе
                                        </Button>
                                    </div>}
                            </div>
                            {props.type === "employer" ? <div>
                                <NavLink to="/profile">
                                    <Button onClick={() => {

                                        let data = {
                                            idEmployee: v.idEmployee,
                                            idEmployer: props.userId
                                        }
                                        props.createChat(data)

                                    }}>Написать сообщение</Button>
                                </NavLink>

                            </div> : null}

                            <SendReportContainer idIntruder={v.idEmployee} typeIntruder={1}/>

                            {/*{!vacancyIsFavorite ?
                                props.favoriteVacancy.map(fv => {
                                    if (fv.idVacancy === v.idFind_Employer) {
                                    setVacancyIsFavorite(true)
                                    }

                                }) : null
                            }*/}
                            {props.isAuth ? props.vacancyIsFavorite ?

                                !delVacancyFavorite ?
                                    <div>
                                        <Button onClick={() => {
                                            setDelVacancyFavorite(true)
                                            props.deleteFavoriteVacancy(v.idFind_Employer, props.userId)
                                        }}>Убрать из избранного</Button>
                                    </div>
                                    :
                                    <div>Убрано из избранного</div>

                                :

                                !addVacancyFavorite ?
                                    <div>
                                        <Button onClick={() => {
                                            setAddVacancyFavorite(true)
                                            props.addFavoriteVacancy(v.idFind_Employer, props.userId)
                                        }}>Добавить в избранное</Button>
                                    </div>
                                    : <div>Добавлено в избранное</div>
                                : null

                            }


                            {/* {props.vacancyIsFavorite ?
                                !delVacancyFavorite ?
                                    <div>
                                        <Button onClick={() => {
                                            setVacancyIsFavorite(false)
                                            props.deleteFavoriteVacancy(v.idFind_Employer, props.userId)
                                        }}>Убрать из избранного</Button>
                                    </div> :
                                    <div>Убрано из избранного</div> :
                                !vacancyIsFavorite ?
                                    <div>
                                        <Button onClick={() => {
                                            props.addFavoriteVacancy(v.idFind_Employer, props.userId)
                                        }}>Добавить в избранное</Button>
                                    </div>
                                    : null}*/}


                        </div>
                    )}

            </div>


        </div>
    )
}

export default Vacancy;


