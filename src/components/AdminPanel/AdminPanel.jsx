import React from "react";
import AEmployerContainer from "./Users/aEmployerContainer";
import AEmployeeContainer from "./Users/aEmployeeContainer";
import JobsContainer from "./jobs/jobsContainer";
import {getFeedbacks} from "../../redux/admin-reducer";
import FeedbackAboutEmployeeContainer from "./Feedbacks/FeedbackAboutEmployeeContainer";
import FeedbackAboutEmployerContainer from "./Feedbacks/FeedbackAboutEmployerContainer";
import {Button} from "../common/formsControl";
import ReportsContainer from "./Reports/ReportsContainer";


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
        case "reports":
            return <ReportsContainer/>

        default:
            return <div>
                <div>
                    <Button onClick={() => {
                        props.SetActionType("employer")
                    }}>
                        Список всех соискателей
                    </Button>
                </div>
                <div>
                    <Button onClick={() => {
                        props.SetActionType("employee")
                    }}>
                        Список всех работодателей
                    </Button>
                </div>
                <div>
                    <Button onClick={() => {
                        props.SetActionType("jobs")
                    }}>
                        Список профессий и специализаций
                    </Button>
                </div>
                <div>
                    <Button onClick={() => {
                        props.getFeedbacks("employee",props.token)
                        props.SetActionType("feedbackEmployee")
                    }}>
                        Список отзывов о работодателях
                    </Button>
                </div>
                <div>
                    <Button onClick={() => {
                        props.getFeedbacks("employer",props.token)
                        props.SetActionType("feedbackEmployer")
                    }}>
                        Список отзывов о сотрудниках
                    </Button>
                </div>
                <div>
                    <Button onClick={() => {
                        props.SetActionType("reports")
                    }}>
                        Список репортов
                    </Button>
                </div>
            </div>
    }


}

export default AdminPanel;


