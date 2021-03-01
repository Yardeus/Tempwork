import React from "react";
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Button, Input} from "../../../common/formsControl";
import s from "../MyWorks/MyWorks.module.css";
import moment from "moment";


let FeedbackForm = (props) => {
    const {handleSubmit} = props;
    debugger
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <Field placeholder={"Введите отзыв"} name={"feedback"} component={Input}/>
                </div>
                <div>
                    <Button type="submit">Отправить отзыв</Button>
                </div>
                <div>
                    <Button onClick={() => {
                        props.setFeedbackMode(false)
                    }}>Отменить
                    </Button>
                </div>

            </div>
        </form>
    )
}

const VacancyReduxForm = reduxForm({form: 'feedback'})(FeedbackForm)

let WorkersList = (props) => {

    const onSubmit = (formData) => {
        debugger
        if (props.feedbackMode) {
            let data = {};
            props.responded.map(v => {
                    if (v.idEmployer === props.feedbackMode)
                        return (
                            data = {

                                idEmployee:  props.userId,
                                idEmployer:v.idEmployer,
                                feedback: formData.feedback,
                            }
                        )

                }
            )

            console.log(formData)
            props.sendFeedbackEmployer(data)
            props.setFeedbackMode(false)
            props.setFeedbackSendMode(true)

        }


    }

    return (<>
            {props.type === "employer" ? null : <div>
                {
                    props.responded.map(v => <div className={s.vacancy+" "+s.text}>

                            <div>
                                {v.Firstname} {v.Surname} {v.Middle_Name}
                            </div>
                            <div>
                                {v.Sex}
                            </div>
                            <div>
                                День рождения - {moment(v.Birthday).format('L')}
                            </div>
                            <div>
                                Город - {v.City}
                            </div>
                            <div>
                                Профессия - {v.Profession}
                            </div>
                            {/*<div>
                                Часов отработано на TempWork - {v.Hours_Worked}
                            </div>*/}
                            <div>
                                Описание - {v.Description}
                            </div>
                            <div>
                                Номер телефона - {v.Phone_Number}
                            </div>
                            <div>
                                Электронная почта - {v.Email}
                            </div>
                            <div>
                                Дата регистрации на сайте - {moment(v.Date_Registration).format('L')}
                            </div>
                            <div>
                                {props.feedbackSendMode  ? <div>Спасибо за оставленный отзыв</div> :
                                    <div>{props.feedbackMode === v.idEmployer ? <div>
                                            <VacancyReduxForm onSubmit={onSubmit} setFeedbackMode={props.setFeedbackMode}
                                                              setFeedbackSendMode={props.setFeedbackSendMode}
                                                              sendFeedbackEmployer={props.sendFeedbackEmployer}/>
                                        </div>
                                        :
                                        <div>
                                            <Button onClick={() => {
                                                props.setFeedbackMode(v.idEmployer)
                                            }}>
                                                Оставить отзыв
                                            </Button>
                                        </div>}</div>}
                            </div>
                        </div>
                    )}
                <div>
                    <NavLink to={"/my-vacancy"}>
                        <Button onClick={() => {
                            props.SetCurrentRespondVacancyId(null)
                            props.FormRespondedMyVacancy([])
                        }}>
                            Назад
                        </Button>
                    </NavLink>

                </div>
            </div>}
        </>
    )
}

export default WorkersList;


