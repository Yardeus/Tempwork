import React from "react";
import {connect} from "react-redux";

import * as axios from "axios";
import {
    addFavoriteVacancy, deleteFavoriteVacancy,
    follow, getFeedbackEmployee, getVacancy,
    respondVacancy, sendFeedbackEmployee,
    setCurrentPage, setFeedbackMode, setFeedbackSendMode, setIsResponded, setIsViewFeedback,
    setOneVacancy,
    toggleIsFetching,
    unFollow
} from "../../../../redux/employee-reducer";
import Vacancy from "./vacancy";
import withRouter from "react-router-dom/es/withRouter";
import {compose} from "redux";
import withUrlDataContainer from "../../../../hoc/WithAuthRedirect"
import {closeVacancyAdmin, setIsVacancyClosed} from "../../../../redux/admin-reducer";
import {createChat, setProfileMode} from "../../../../redux/profile-reducer";


class VacancyContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        let vacancyId = this.props.match.params.vacancyId;
        axios.get(`http://localhost:8080/api/vacancy/one?id=` + vacancyId)
            .then(response => {
                this.props.setOneVacancy(response.data.values,this.props.favoriteVacancy);
                this.props.toggleIsFetching(false);
                return (
                    <Vacancy {...this.props} />
                )
            })
        this.props.setFeedbackSendMode(false)
        this.props.setIsVacancyClosed(false)
        this.props.setIsResponded(false)

    }

    onRespond(idVacancy,token) {
        debugger
        this.respondVacancy(idVacancy, this.userId, token);
        this.setIsResponded(true)
    }

    render() {
        return (
            <Vacancy {...this.props} onRespond={this.onRespond}
                     setFeedbackMode={this.props.setFeedbackMode}
                     setFeedbackSendMode={this.props.setFeedbackSendMode}
                     sendFeedbackEmployee={this.props.sendFeedbackEmployee}
                     closeVacancyAdmin={this.props.closeVacancyAdmin}
                     setIsVacancyClosed={this.props.setIsVacancyClosed}
                     setIsResponded={this.props.setIsResponded}
                     getFeedbackEmployee={this.props.getFeedbackEmployee}
                     createChat={this.props.createChat}
                     setProfileMode={this.props.setProfileMode}
                     addFavoriteVacancy={this.props.addFavoriteVacancy}
                     deleteFavoriteVacancy={this.props.deleteFavoriteVacancy}
            />
        )
    }

}


let mapStateToProps = (state) => {
    return {
        oneVacancy: state.employeePage.oneVacancy,
        userId: state.auth.userId,
        feedbackMode: state.employeePage.feedbackMode,
        feedbackSendMode: state.employeePage.feedbackSendMode,
        type: state.auth.type,
        isVacancyClosed: state.admin.isVacancyClosed,
        isResponded: state.employeePage.isResponded,
        isViewFeedback: state.employeePage.isViewFeedback,
        feedbacks: state.employeePage.feedbacks,
        isAuth: state.auth.isAuth,
        favoriteVacancy: state.employeePage.favoriteVacancy,
        vacancyIsFavorite: state.employeePage.vacancyIsFavorite,
        token: state.auth.token
    }
}


export default compose(
    connect(mapStateToProps,
        {
            setCurrentPage,
            toggleIsFetching,
            setOneVacancy,
            getVacancy,
            setFeedbackMode,
            setFeedbackSendMode,
            sendFeedbackEmployee,
            closeVacancyAdmin,
            setIsVacancyClosed,
            respondVacancy,
            setIsResponded,
            setIsViewFeedback,
            getFeedbackEmployee,
            createChat,
            setProfileMode,
            addFavoriteVacancy,
            deleteFavoriteVacancy
        }),
    withRouter
)(VacancyContainer);

