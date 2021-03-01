import React from "react";
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Button, Input} from "../../../common/formsControl";
import moment from "moment";
import {required} from "../../../../utils/validators/validators";

import s from './MyWorks.module.css'


class MyWorksForm extends React.Component{
    render() {
        const {handleSubmit} = this.props;
        debugger
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <Field placeholder={"Введите отзыв"} name={"feedback"} component={Input}/>
                    </div>
                    <div>
                        Оцените работодателя
                    </div>
                    <div>
                        <label>
                            <Field name="rank" component={Input} type="radio" value="like" validate={[required]}/>{' '}
                            Хорошо
                        </label>
                        <label>
                            <Field name="rank" component={Input} type="radio" value="neutral" validate={[required]}/>{' '}
                            Нейтрально
                        </label>
                        <label>
                            <Field name="rank" component={Input} type="radio" value="dislike" validate={[required]}/>{' '}
                            Плохо
                        </label>
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

const MyWorksReduxForm = reduxForm({form: 'feedback'})(MyWorksForm)

let MyWorks = (props) => {

    const onSubmit = (formData) => {
        debugger
        if (props.feedbackMode) {
            let data = {};
            props.myWorks.map(v => {
                    if (v.idFind_Employer === props.feedbackMode)
                        return (
                            data = {

                                idEmployer: props.userId,
                                idEmployee: v.idEmployee,
                                feedback: formData.feedback,
                                rank: formData.rank,
                                idVacancy: v.idFind_Employer
                            }
                        )

                }
            )

            console.log(formData)
            props.sendFeedbackEmployee(data)
            props.setFeedbackMode(false)
            props.setFeedbackSendMode(true)

        }


    }

    return (<div>
            {props.type === "employee" ? null : <div>
                {
                    props.myWorks.map(v => <div className={s.vacancy}>

                        <div className={s.specialisation}>
                            {v.Profession} {v.Specialisation}
                        </div>
                        <div className={s.paid}>
                            Оплата - {v.Price}
                        </div>
                        <div className={s.company}>
                            {v.Organization_name}
                        </div>
                        <div className={s.date}>
                            {moment(v.Start_Date).format('L')} - {moment(v.End_Date).format('L')}
                        </div>

                        <div className={s.adress}>
                            {v.City}, {v.Adress}
                        </div>

                        <div className={s.date}>
                            График работы
                            <div>Начало дня - {v.Start_Time}</div>
                            <div>Конец дня - {v.End_Time}</div>
                        </div>
                            <div className={s.text}>
                                Статус - {v.Status}
                            </div>
                            <div className={s.date}>
                                Дата начала работы - {moment(v.Start_Date).format('L')}
                            </div>
                            <div className={s.date}>
                                Дата конца работы - {moment(v.End_Date).format('L')}
                            </div>


                            <div className={s.text}>
                                Описание - {v.Description}
                            </div>



                            <div>
                                {props.feedbackSendMode ? <div>Спасибо за оставленный отзыв</div> :
                                    <div>{props.feedbackMode === v.idFind_Employer ? <div>
                                            <MyWorksReduxForm onSubmit={onSubmit} setFeedbackMode={props.setFeedbackMode}
                                                              setFeedbackSendMode={props.setFeedbackSendMode}
                                                              sendFeedbackEmployee={props.sendFeedbackEmployee}/>
                                        </div>
                                        :
                                        <div>
                                            <Button onClick={() => {
                                                props.setFeedbackMode(v.idFind_Employer)
                                            }}>
                                                Оставить отзыв
                                            </Button>
                                        </div>}</div>}
                            </div>


                        </div>
                    )}
                <div>
                    <NavLink to={"/profile"}>
                        <Button onClick={() => {
                            props.SetCurrentRespondVacancyId(null)
                            props.FormRespondedMyVacancy([])
                        }}>
                            Назад
                        </Button>
                    </NavLink>

                </div>
            </div>}
        </div>
    )
}

export default MyWorks;


