import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {getFeedback} from "../../../redux/profile-reducer";
import Preloader from "../../common/preloader";
import Feedback from "./Feedback";


class FeedbackContainer extends React.Component {

    componentDidMount() {
        this.props.getFeedback(this.props.type, this.props.userId)
    }




    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : <Feedback {...this.props}  />}

        </>

    }
}

let mapStateToProps = (state) => {
    return {
        profileData: state.profilePage.profileData,
        userId: state.auth.userId,
        type: state.auth.type,
        isFetching: state.auth.isFetching,
        myVacancy: state.profilePage.myVacancy,
        feedback: state.profilePage.feedback

    }
}

export default compose(
    connect(mapStateToProps,
        {getFeedback})
)(FeedbackContainer);






