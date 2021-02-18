import React from "react";
import {NavLink} from "react-router-dom";
import s from "../../Employee/List/List.module.css";

let Feedback = (props) => {
    return (
        <>
            {props.type === "employee" ? <div>
                {
                    props.feedback.map(p => <div>

                        <div>
                            Соискатель - {p.Surname} {p.Firstname} {p.Middle_Name}
                        </div>
                        <div>
                            Номер вакансии - {p.idVacancy}
                        </div>
                        <div>
                            Отзыв - {p.feedback}
                        </div>
                    </div>)

                }
                <div className={s.btn}>
                    <NavLink to={"/profile"}>
                        <button>Назад
                        </button>
                    </NavLink>
                </div>
            </div> : null}
        </>
    )
}

export default Feedback;


