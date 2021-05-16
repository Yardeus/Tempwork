import React from "react";
import {NavLink} from "react-router-dom";
import {Button} from "../../../common/formsControl";
import moment from "moment";
import s from "./RespondedList.module.css";


let RespondedList = (props) => {


    return (<>
            {props.type === "employer" ? null : <div>
                {
                    props.responded.map(v => <div className={s.vacancy + " " + s.text}>

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
                                {props.isViewFeedback ? <div>
                                        <div>
                                            <Button onClick={() => {
                                                props.setIsViewFeedback(false)
                                            }}>Закрыть отзывы
                                            </Button>
                                        </div>
                                        <div>
                                            {props.feedbacks.map(f => <div>
                                                <div>
                                                    Название организаии - {f.Organization_name}
                                                </div>
                                                <div className={s.item + " " + s.feed}>
                                                    {f.feedback.length > 0 && f.feedback !== "undefined" && f.feedback !== "null" ?
                                                        <div>
                                                            Отзыв - {f.feedback}
                                                        </div> : null}
                                                    {f.rank ? <div>
                                                        Мнение - {f.rank === "like" ?
                                                        <span>Хорошее</span> : f.rank === "dislike" ?
                                                            <span>Плохое</span> : <span>Нейтральное</span>}
                                                    </div> : null}
                                                </div>


                                                <div>

                                                </div>
                                            </div>)}
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <Button onClick={() => {
                                            props.getFeedbackEmployer(v.idEmployer)
                                        }}>
                                            Просмотреть отзывы о соискателе
                                        </Button>
                                    </div>}
                            </div>
                            {props.type === "employee" ? <div>
                                <NavLink to="/profile">
                                    <Button onClick={() => {

                                        let data = {
                                            idEmployee: props.userId,
                                            idEmployer: v.idEmployer
                                        }
                                        props.createChat(data)

                                    }}>Написать сообщение</Button>
                                </NavLink>

                            </div> : null}

                            {!v.Status ? <div>
                                <Button onClick={() => {
                                    let data = {
                                        idFind_Employer: v.idFind_Employer,
                                        idEmployer: v.idEmployer
                                    }

                                    props.createAgreement(data)
                                }}>
                                    Принять на работу
                                </Button>

                            </div> : <div>
                                <Button>
                                    Отклонить
                                </Button>
                            </div>}


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

export default RespondedList;


