import React from "react";
import s from "./vacancy.module.css";
import {NavLink, Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Button, Input} from "../../../common/formsControl";
import moment from "moment";

import {length} from "redux-form-validators";
import TextField from "@material-ui/core/TextField";

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
                                Электронная почта для связи {v.Email}
                            </div>
                            <div>
                                <NavLink to={"/employee"}>
                                    <Button>Вернуться</Button>
                                </NavLink>
                            </div>
                            {props.isResponded ? <div>Вы откликнулись</div> :
                                <div>
                                    <Button onClick={() => {
                                        props.onRespond(v.idFind_Employer)
                                    }}>Откликнуться
                                    </Button>
                                </div>
                            }

                            {props.type === "admin" ? props.isVacancyClosed ? <div>Вакансия закрыта</div> : <div>
                                <button onClick={() => {
                                    props.closeVacancyAdmin(v.idFind_Employer)
                                    props.setIsVacancyClosed(true)
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
                                            {props.feedbacks.length > 0 ? props.feedbacks.map(f => <div>
                                                <div className={s.name}>
                                                    {f.Surname} {f.Firstname} {f.Middle_Name}
                                                </div>
                                                <div className={s.item}>
                                                    {f.rank ? <div>
                                                        Мнение - {f.rank === "like" ? <span>Хорошее</span> : f.rank === "dislike" ?
                                                        <span>Плохое</span> : <span>Нейтральное</span>}
                                                    </div> : null}
                                                    {f.feedback.length > 0 && f.feedback !== "undefined" && f.feedback !== "null" ?
                                                        <div>
                                                            Отзыв - {f.feedback}
                                                        </div> : null}

                                                </div>

                                            </div>) : ()=>{return <div>Отзывов нет</div>}}
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


                        </div>
                    )}

            </div>


        </div>
    )
}

export default Vacancy;


