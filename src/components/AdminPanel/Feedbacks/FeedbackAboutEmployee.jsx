import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/formsControl";
import {addJobs} from "../../../redux/admin-reducer";

let FeedbackAboutEmployee = (props) => {

    return <div>
        <div>
            <button onClick={() => {
                props.SetActionType(null)
            }}>
                Назад
            </button>
        </div>


        <div>
            {props.feedbackList.map(j => <div>
                <div>
                    ID Отзыва - {j.id}
                </div>

                <div>
                    ID работодателя - {j.idEmployee}
                </div>
                <div>
                    ID сотрудника - {j.idEmployer}
                </div>
                <div>
                    Отзыв - {j.feedback}
                </div>
                <div>
                    ID вакансии на которой оставили - {j.idVacancy}
                </div>
                <div>
                    <button onClick={() => {
                        props.deleteFeedback("employee",j.id)
                    }}>Удалить
                    </button>
                </div>
            </div>)}
        </div>


    </div>


}

export default FeedbackAboutEmployee;


