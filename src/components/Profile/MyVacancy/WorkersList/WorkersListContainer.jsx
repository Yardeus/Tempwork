import React from "react";
import {connect} from "react-redux";

import {compose} from "redux";
import {
    createAgreement, createChat,
    FormRespondedMyVacancy,
    getRespondedFromMyVacancy, getWorkersFromMyVacancy,
    SetCurrentRespondVacancyId
} from "../../../../redux/profile-reducer";
import WorkersList from "./WorkersList";
import {sendFeedbackEmployer, setFeedbackMode, setFeedbackSendMode} from "../../../../redux/employee-reducer";
import Vacancy from "../../../Employee/List/Vacancy/vacancy";


class WorkersListContainer extends React.Component {

    componentDidMount() {
        this.props.getWorkersFromMyVacancy(this.props.currentResponded)
        this.props.setFeedbackSendMode(false)
    }




    render() {
        return <>
            <WorkersList {...this.props} SetCurrentRespondVacancyId={this.props.SetCurrentRespondVacancyId}
                         FormRespondedMyVacancy={this.props.FormRespondedMyVacancy}
                         createAgreement={this.props.createAgreement}
                         setFeedbackMode={this.props.setFeedbackMode}
                         setFeedbackSendMode={this.props.setFeedbackSendMode}
                         sendFeedbackEmployer={this.props.sendFeedbackEmployer}
                         createChat={this.props.createChat}/>

        </>
    }

}


let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        isFetching: state.auth.isFetching,
        myVacancy: state.profilePage.myVacancy,
        type: state.auth.type,
        editVacancy: state.profilePage.editVacancy,
        responded: state.profilePage.responded,
        currentResponded: state.profilePage.currentResponded,
        feedbackMode: state.employeePage.feedbackMode,
        feedbackSendMode: state.employeePage.feedbackSendMode

    }
}

export default compose(
    connect(mapStateToProps, {getWorkersFromMyVacancy,createChat,SetCurrentRespondVacancyId,FormRespondedMyVacancy, createAgreement,  setFeedbackMode, setFeedbackSendMode,sendFeedbackEmployer})
)(WorkersListContainer);



