import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Feedback.module.css";
import {Button} from "../../common/formsControl";

let Feedback = (props) => {
    return (
        <div className={s.text}>
            {props.type === "employee" ? <div>
                {
                    props.feedback.map(f => <div>
                        <div className={s.name}>
                            {f.Surname} {f.Firstname} {f.Middle_Name}
                        </div>
                        <div className={s.name}>
                            Номер вакансии - {f.idVacancy}
                        </div>
                        <div className={s.item+" "+s.feed}>
                            {f.rank ? <div>
                                Мнение - {f.rank === "like" ? <span>Хорошее</span> : f.rank === "dislike" ?
                                <span>Плохое</span> : <span>Нейтральное</span>}
                            </div> : null}
                            {f.feedback.length > 0 && f.feedback !== "undefined" && f.feedback !== "null" ?
                                <div>
                                    Отзыв - {f.feedback}
                                </div> : null}

                        </div>



                    </div>)

                }
                <div className={s.btn}>
                    <NavLink to={"/profile"}>
                        <Button>Назад
                        </Button>
                    </NavLink>
                </div>
            </div> : <div>
                {props.feedback ? props.feedback.map(f => <div>
                    <div className={s.name}>
                        {f.Organization_name}
                    </div>
                    <div className={s.item+" "+s.feed}>
                        {f.rank ? <div>
                            Мнение - {f.rank === "like" ? <span>Хорошее</span> : f.rank === "dislike" ?
                            <span>Плохое</span> : <span>Нейтральное</span>}
                        </div> : null}
                        {f.feedback.length > 0 && f.feedback !== "undefined" && f.feedback !== "null" ?
                            <div>
                                Отзыв - {f.feedback}
                            </div> : null}

                    </div>

                </div>) : ()=>{return <div>Отзывов нет</div>}}
                <div className={s.btn}>
                    <NavLink to={"/profile"}>
                        <Button>Назад
                        </Button>
                    </NavLink>
                </div>
            </div>}
        </div>
    )
}

export default Feedback;


