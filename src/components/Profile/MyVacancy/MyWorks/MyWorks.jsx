import React from "react";
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../common/formsControl";
import moment from "moment";
import {required} from "../../../../utils/validators/validators";


let MyWorksForm = (props) => {
    const {handleSubmit} = props;
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
                        props.setFeedbackMode(false)
                    }}>Отменить
                    </button>
                </div>

            </div>
        </form>
    )
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

    return (<>
            {props.type === "employee" ? null : <div>
                {
                    props.myWorks.map(v => <div>

                            <div>
                                Название организации - {v.Organization_name}
                            </div>
                            <div>
                                Оплата - {v.Price}
                            </div>
                            <div>
                                Статус - {v.Status}
                            </div>
                            <div>
                                Дата начала работы - {moment(v.Start_Date).format('L')}
                            </div>
                            <div>
                                Дата конца работы - {moment(v.End_Date).format('L')}
                            </div>

                            <div>
                                Время начала рабочего дня - {moment(v.Start_Time, 'hh:mm:ss').format('LT')}
                            </div>
                            <div>
                                Время конца рабочего дня - {moment(v.End_Time, 'hh:mm:ss').format('LT')}
                            </div>
                            <div>
                                Город - {v.City}
                            </div>
                            <div>
                                Описание - {v.Description}
                            </div>
                            <div>
                                Адрес - {v.Adress}
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
                                            <button onClick={() => {
                                                props.setFeedbackMode(v.idFind_Employer)
                                            }}>
                                                Оставить отзыв
                                            </button>
                                        </div>}</div>}
                            </div>


                        </div>
                    )}
                <div>
                    <NavLink to={"/profile"}>
                        <button onClick={() => {
                            props.SetCurrentRespondVacancyId(null)
                            props.FormRespondedMyVacancy([])
                        }}>
                            Назад
                        </button>
                    </NavLink>

                </div>
            </div>}
        </>
    )
}

export default MyWorks;


