import React from "react";
import s from "../List.module.css";
import {NavLink, Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../../utils/validators/validators";
import {Input} from "../../../common/formsControl";
import {feedbackAPI} from "../../../../api/api";
import moment from "moment";

let VacancyForm = (props) => {
    const {handleSubmit} = props;
    debugger
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <Field placeholder={"Введите отзыв"} name={"feedback"} component={Input}/>
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

const VacancyReduxForm = reduxForm({form: 'vacancy'})(VacancyForm)

const Vacancy = (props) => {

    const onSubmit = (formData) => {
        debugger
        if (props.feedbackMode) {
            let data = {};
            props.oneVacancy.map(v => data = {

                idEmployee: v.idEmployee,
                idEmployer: props.userId,
                feedback: formData.feedback,
                idVacancy:v.idFind_Employer
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

                            <div>
                                Компания - {v.idFind_Employer}
                            </div>
                            <div>
                                Дата начала работы - {moment(v.Start_Date).format('L')}
                            </div>
                            <div>
                                Дата конца работы - {moment(v.End_Date).format('L')}
                            </div>
                            <div>
                                Описание - {v.Description}
                            </div>
                            <div>
                                Оплата - {v.Price}
                            </div>
                            <div>
                                Город - {v.City}
                            </div>
                            <div>
                                Адрес - {v.Adress}
                            </div>

                            <div>
                                График работы
                                <div>Начало дня - {moment(v.Start_Time,'hh:mm:ss').format('LT')}</div>
                                <div>Конец дня - {moment(v.End_Time,'hh:mm:ss').format('LT')}</div>
                            </div>
                            <div>
                                <NavLink to={"/employee"}>
                                    <button>Вернуться</button>
                                </NavLink>
                            </div>
                            <div>
                                <button onClick={() => {
                                    props.onRespond(v.idFind_Employer)
                                }}>Откликнуться
                                </button>
                            </div>
                            {props.feedbackSendMode ? <div>Спасибо за оставленный отзыв</div> :
                                <div>{props.feedbackMode === v.idFind_Employer ? <div>
                                        <VacancyReduxForm onSubmit={onSubmit} setFeedbackMode={props.setFeedbackMode}
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
                    )}

            </div>


        </div>
    )
}

export default Vacancy;


