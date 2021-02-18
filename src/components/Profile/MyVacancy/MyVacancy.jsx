import React from "react";
import {NavLink} from "react-router-dom";
import s from './MyVacancy.module.css'
import moment from "moment";


let myVacancy = (props) => {


    return (<>
            {props.type === "employer" ? <div>
                {
                    props.myVacancy.map(v => <div className={s.vacancy}>

                            <div>
                                Компания - {v.idFind_Employer}
                            </div>
                            <div>
                                Дата начала работы - {v.Start_Date}
                            </div>
                            <div>
                                Дата конца работы - {v.End_Date}
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
                                <div>Начало дня - {v.Start_Time}</div>
                                <div>Конец дня - {v.End_Time}</div>
                            </div>
                            <div>
                                <button onClick={() => {
                                    props.deleteVacancy(v.id, v.idEmployer, props.type)
                                }}>
                                    Убрать отклик
                                </button>
                            </div>

                        </div>
                    )}

            </div> : <div>
                {
                    props.myVacancy.map(v => <div className={s.vacancy}>

                            <div>
                                Номер вакансии - {v.idFind_Employer}
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
                            {v.Status === "Активно" ?
                                <>
                                    <div>
                                        <NavLink to={"/edit-vacancy/" + v.idFind_Employer}>
                                            <button>Редактировать</button>
                                        </NavLink>
                                    </div>
                                    <div>
                                        <button onClick={() => {
                                            props.closeMyVacancy(v.idFind_Employer, props.userId)
                                        }}>
                                            Закрыть вакансию
                                        </button>
                                    </div>
                                    <div>
                                        <NavLink to={"/responded-list"}>
                                            <button onClick={() => {
                                                props.SetCurrentRespondVacancyId(v.idFind_Employer)
                                            }}>
                                                Список откликнувшихся
                                            </button>
                                        </NavLink>

                                    </div>
                                    <div>
                                        <NavLink to={"/my-workers"}>
                                            <button onClick={() => {
                                                props.SetCurrentRespondVacancyId(v.idFind_Employer)
                                            }}>
                                                Список работников
                                            </button>
                                        </NavLink>

                                    </div>
                                </>
                                : null}
                        </div>
                    )}

            </div>}
        </>
    )
}

export default myVacancy;


