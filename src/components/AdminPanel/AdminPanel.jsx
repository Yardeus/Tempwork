import React from "react";
import AEmployerContainer from "./Users/aEmployerContainer";
import AEmployeeContainer from "./Users/aEmployeeContainer";
import JobsContainer from "./jobs/jobsContainer";
import {getFeedbacks} from "../../redux/admin-reducer";
import FeedbackAboutEmployeeContainer from "./Feedbacks/FeedbackAboutEmployeeContainer";
import FeedbackAboutEmployerContainer from "./Feedbacks/FeedbackAboutEmployerContainer";


let AdminPanel = (props) => {

    switch (props.actionType) {
        case "employer":
            return <AEmployerContainer/>
        case "employee":
            return <AEmployeeContainer/>
        case "jobs":
            return <JobsContainer/>
        case "feedbackEmployee":
            return <FeedbackAboutEmployeeContainer/>
        case "feedbackEmployer":
            return <FeedbackAboutEmployerContainer/>

        default:
            return <div>
                <div>
                    <button onClick={() => {
                        props.SetActionType("employer")
                    }}>
                        Список всех соискателей
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        props.SetActionType("employee")
                    }}>
                        Список всех работодателей
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        props.SetActionType("jobs")
                    }}>
                        Список профессий и специализаций
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        props.getFeedbacks("employee")
                        props.SetActionType("feedbackEmployee")
                    }}>
                        Список отзывов о работодателях
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        props.getFeedbacks("employer")
                        props.SetActionType("feedbackEmployer")
                    }}>
                        Список отзывов о сотрудниках
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        props.SetActionType("vacancy")
                    }}>
                        Список всех вакансий
                    </button>
                </div>
            </div>
    }


}

export default AdminPanel;


