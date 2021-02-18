import React from "react";
import {connect} from "react-redux";

import * as axios from "axios";
import {
    follow, getVacancy,
    respondVacancy, sendFeedbackEmployee,
    setCurrentPage, setFeedbackMode, setFeedbackSendMode,
    setOneVacancy,
    toggleIsFetching,
    unFollow
} from "../../../../redux/employee-reducer";
import Vacancy from "./vacancy";
import withRouter from "react-router-dom/es/withRouter";
import {compose} from "redux";
import withUrlDataContainer from "../../../../hoc/WithAuthRedirect"




class VacancyContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        debugger
        let vacancyId = this.props.match.params.vacancyId;
        axios.get(`http://localhost:8080/api/vacancy/one?id=`+vacancyId)
            .then(response => {
                debugger
                this.props.setOneVacancy(response.data.values);
                this.props.toggleIsFetching(false);
                return (
                    <Vacancy {...this.props}/>
                )
            })
        this.props.setFeedbackSendMode(false)
    }

    onRespond(idVacancy){
        debugger
        this.respondVacancy(idVacancy, this.userId);
    }

    render() {
        return (
            <Vacancy {...this.props} onRespond={this.onRespond}
                     setFeedbackMode={this.props.setFeedbackMode}
                     setFeedbackSendMode={this.props.setFeedbackSendMode}
                     sendFeedbackEmployee={this.props.sendFeedbackEmployee}/>
        )
    }

}



let mapStateToProps = (state) => {
    return {
        oneVacancy: state.employeePage.oneVacancy,
        userId: state.auth.userId,
        feedbackMode: state.employeePage.feedbackMode,
        feedbackSendMode: state.employeePage.feedbackSendMode
    }
}


export default compose(
    connect(mapStateToProps,
        {follow, unFollow, setCurrentPage, toggleIsFetching, setOneVacancy, getVacancy, setFeedbackMode, setFeedbackSendMode, sendFeedbackEmployee}),
    withRouter
)(VacancyContainer);

