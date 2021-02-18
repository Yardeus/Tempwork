import React from "react";
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../common/formsControl";


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
                    props.responded.map(v => <div>

                            <div>
                                Фамилия - {v.Surname}
                            </div>
                            <div>
                                Имя - {v.Firstname}
                            </div>
                            <div>
                                Отчество - {v.Middle_Name}
                            </div>
                            <div>
                                Пол - {v.Sex}
                            </div>
                            <div>
                                День рождения - {v.Birthday}
                            </div>
                            <div>
                                Город - {v.City}
                            </div>
                            <div>
                                Профессия - {v.Profession}
                            </div>
                            <div>
                                Часов отработано на TempWork - {v.Hours_Worked}
                            </div>
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
                                Дата регистрации на сайте - {v.Date_Registration}
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
                                            <button onClick={() => {
                                                props.setFeedbackMode(v.idEmployer)
                                            }}>
                                                Оставить отзыв
                                            </button>
                                        </div>}</div>}
                            </div>

                            {/*<div>
                            <button onClick={() => {
                                return <VacancyReduxForm key={v.idEmployer} onSubmit={onSubmit} setFeedbackMode={props.setFeedbackMode}
                                                         setFeedbackSendMode={props.setFeedbackSendMode}
                                                         sendFeedbackEmployer={props.sendFeedbackEmployer}/>
                            }}>тык</button>
                        </div>*/}


                        </div>
                    )}
                <div>
                    <NavLink to={"/my-vacancy"}>
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

export default WorkersList;


