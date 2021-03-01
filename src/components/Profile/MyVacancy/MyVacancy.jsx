import React from "react";
import {NavLink} from "react-router-dom";
import s from './MyVacancy.module.css'
import moment from "moment";
import {Button} from "../../common/formsControl";


let myVacancy = (props) => {


    return (<div className={s.text}>
            {props.type === "employer" ? <div>
                {
                    props.myVacancy.map(v => <div className={s.vacancy}>

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
                            <div align={"right"}>
                                <Button onClick={() => {
                                    props.deleteVacancy(v.id, v.idEmployer, props.type)
                                }}>
                                    Убрать отклик
                                </Button>
                            </div>


                        </div>
                    )}
                <div>
                    <NavLink to={"/profile"}>
                        <Button>
                            Назад
                        </Button>
                    </NavLink>

                </div>

            </div> : <div>
                {
                    props.myVacancy.map(v => <div className={s.vacancy}>

                            <div>
                                Номер вакансии - {v.idFind_Employer}
                            </div>
                            <div>
                                {v.Profession} {v.Specialisation}
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
                                <div>Начало дня - {moment(v.Start_Time, 'hh:mm:ss').format('LT')}</div>
                                <div>Конец дня - {moment(v.End_Time, 'hh:mm:ss').format('LT')}</div>
                            </div>
                            {v.Status === "Активно" ?
                                <>
                                    <div>
                                        <NavLink to={"/edit-vacancy/" + v.idFind_Employer}>
                                            <Button>Редактировать</Button>
                                        </NavLink>
                                    </div>
                                    <div>
                                        <Button onClick={() => {
                                            props.closeMyVacancy(v.idFind_Employer, props.userId)
                                        }}>
                                            Закрыть вакансию
                                        </Button>
                                    </div>
                                    <div>
                                        <NavLink to={"/responded-list"}>
                                            <Button onClick={() => {
                                                props.SetCurrentRespondVacancyId(v.idFind_Employer)
                                            }}>
                                                Список откликнувшихся
                                            </Button>
                                        </NavLink>

                                    </div>
                                    <div>
                                        <NavLink to={"/my-workers"}>
                                            <Button onClick={() => {
                                                props.SetCurrentRespondVacancyId(v.idFind_Employer)
                                            }}>
                                                Список работников
                                            </Button>
                                        </NavLink>

                                    </div>
                                </>
                                : null}
                        </div>
                    )}

            </div>}
        </div>
    )
}

export default myVacancy;


