import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import Preloader from "../../common/preloader";
import {
    addJobs,
    deleteFeedback,
    deleteJobs,
    SetActionType,
    setAddJobsMode,
    setSendJobsMode
} from "../../../redux/admin-reducer";
import FeedbackAboutEmployee from "./FeedbackAboutEmployee";


class FeedbackAboutEmployeeContainer extends React.Component {

    componentDidMount() {


    }




    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : <FeedbackAboutEmployee {...this.props} SetActionType={this.props.SetActionType}
                                                                           deleteFeedback={this.props.deleteFeedback}/>}

        </>

    }
}

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        type: state.auth.type,
        isFetching: state.auth.isFetching,
        actionType: state.admin.actionType,
        feedbackList: state.admin.feedbackList


    }
}

export default compose(
    connect(mapStateToProps,
        {SetActionType,deleteFeedback})
)(FeedbackAboutEmployeeContainer);






