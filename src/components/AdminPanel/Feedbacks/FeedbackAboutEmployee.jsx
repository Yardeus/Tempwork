import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, Input} from "../../common/formsControl";
import {addJobs} from "../../../redux/admin-reducer";
import s from "./Feedbacks.module.css"

let FeedbackAboutEmployee = (props) => {

    return <div className={s.text}>
        <div>
            <Button onClick={() => {
                props.SetActionType(null)
            }}>
                Назад
            </Button>
        </div>


        <div>
            {props.feedbackList.map(j => <div className={s.item}>
                <div>
                    ID Отзыва - {j.id}
                </div>

                <div>
                    ID работодателя - {j.idEmployee}
                </div>
                <div>
                    ID сотрудника - {j.idEmployer}
                </div>
                {j.rank? <div>
                    Мнение - {j.rank}
                </div> : null}
                {j.feedback? <div>
                    Отзыв - {j.feedback}
                </div> : null}
                <div>
                    ID вакансии на которой оставили - {j.idVacancy}
                </div>
                <div>
                    <Button onClick={() => {
                        props.deleteFeedback("employee",j.id)
                    }}>Удалить
                    </Button>
                </div>
            </div>)}
        </div>


    </div>


}

export default FeedbackAboutEmployee;


