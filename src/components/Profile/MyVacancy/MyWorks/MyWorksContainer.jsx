import React from "react";
import {connect} from "react-redux";

import {compose} from "redux";
import {
    createAgreement,
    FormRespondedMyVacancy, getMyWorks, getWorkersFromMyVacancy,
    SetCurrentRespondVacancyId
} from "../../../../redux/profile-reducer";
import {
    getFeedbackEmployee,
    sendFeedbackEmployee,
    sendFeedbackEmployer,
    setFeedbackMode,
    setFeedbackSendMode, setIsViewFeedback
} from "../../../../redux/employee-reducer";
import MyWorks from "./MyWorks";
import {WithAuthRedirect} from "../../../../hoc/WithAuthRedirect";


class MyWorksContainer extends React.Component {

    componentDidMount() {
        this.props.getMyWorks(this.props.userId,this.props.token)
        this.props.setFeedbackSendMode(false)
        this.props.setIsViewFeedback(false)
    }




    render() {
        return <>
            <MyWorks {...this.props} SetCurrentRespondVacancyId={this.props.SetCurrentRespondVacancyId}
                         FormRespondedMyVacancy={this.props.FormRespondedMyVacancy}
                         createAgreement={this.props.createAgreement}
                         setFeedbackMode={this.props.setFeedbackMode}
                         setFeedbackSendMode={this.props.setFeedbackSendMode}
                         sendFeedbackEmployee={this.props.sendFeedbackEmployee}
                     setIsViewFeedback={this.props.setIsViewFeedback}
                     />

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
        feedbackSendMode: state.employeePage.feedbackSendMode,
        myWorks: state.profilePage.myWorks,
        token: state.auth.token


    }
}

export default compose(WithAuthRedirect,
    connect(mapStateToProps, {getWorkersFromMyVacancy,SetCurrentRespondVacancyId,FormRespondedMyVacancy, createAgreement,  setFeedbackMode,
        setFeedbackSendMode,sendFeedbackEmployee,getMyWorks,setIsViewFeedback})
)(MyWorksContainer);



