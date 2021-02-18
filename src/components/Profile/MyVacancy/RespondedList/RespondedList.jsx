import React from "react";
import {NavLink} from "react-router-dom";


let RespondedList = (props) => {


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
                        {!v.Status?<div>
                            <button onClick={() => {
                                let data = {idFind_Employer: v.idFind_Employer,
                                    idEmployer: v.idEmployer}

                                props.createAgreement(data)
                            }}>
                                Принять на работу
                            </button>

                        </div> : <div><button >
                            Уволить
                        </button></div>}


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

export default RespondedList;


