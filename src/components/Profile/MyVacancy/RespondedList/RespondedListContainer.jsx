import React from "react";
import {connect} from "react-redux";

import {compose} from "redux";
import {
    createAgreement, createChat,
    FormRespondedMyVacancy,
    getRespondedFromMyVacancy,
    SetCurrentRespondVacancyId
} from "../../../../redux/profile-reducer";
import RespondedList from "./RespondedList";
import {
    getFeedbackEmployee,
    getFeedbackEmployer,
    setIsResponded,
    setIsViewFeedback
} from "../../../../redux/employee-reducer";


class RespondedListContainer extends React.Component {

    componentDidMount() {
        this.props.getRespondedFromMyVacancy(this.props.currentResponded)
        this.props.setIsResponded(false)
    }




    render() {
        return <>
            <RespondedList {...this.props} SetCurrentRespondVacancyId={this.props.SetCurrentRespondVacancyId}
                           FormRespondedMyVacancy={this.props.FormRespondedMyVacancy}
                           createAgreement={this.props.createAgreement}
                           setIsResponded={this.props.setIsResponded}
                           getFeedbackEmployer={this.props.getFeedbackEmployer}
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
        isViewFeedback: state.employeePage.isViewFeedback,
        feedbacks: state.employeePage.feedbacks

    }
}

export default compose(
    connect(mapStateToProps, {getRespondedFromMyVacancy,createChat,SetCurrentRespondVacancyId,FormRespondedMyVacancy, createAgreement,setIsViewFeedback,getFeedbackEmployer,setIsResponded})
)(RespondedListContainer);



