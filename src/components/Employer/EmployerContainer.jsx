import React from "react";
import {connect} from "react-redux";
import Preloader from "../common/preloader";
import {compose} from "redux";
import Employer from "./Employer";
import {changeOneProfession, createNewVacancy, getJobs, setIsVacancyCreated} from "../../redux/employer-reducer";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {Redirect} from "react-router-dom";

class EmployerContainer extends React.Component {


    componentDidMount() {
        this.props.getJobs("professions");
        this.props.setIsVacancyCreated(false)
    }

    getSpecialisations = (profession) => {
        this.props.getJobs("specialisation",profession);
    }

    render() {
        return (
            <>
                {this.props.isVacancyCreated?  <Redirect to={'/profile'}/> : null}
                {!this.props.professions ? <Preloader/> : <Employer {...this.props} getSpecialisations={this.getSpecialisations}
                                                                    setIsVacancyCreated={this.props.setIsVacancyCreated}/>}

            </>
        )
    }

}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    isFetching: state.auth.isFetching,
    loginInProgress: state.auth.loginInProgress,
    professions: state.employerPage.professions,
    specialisations: state.employerPage.specialisations,
    oneProfession: state.employerPage.oneProfession,
    userId: state.auth.userId,
    isVacancyCreated: state.employerPage.isVacancyCreated,
    token: state.auth.token
})

export default compose(
    WithAuthRedirect,
    connect(mapStateToProps, {getJobs,changeOneProfession,createNewVacancy,setIsVacancyCreated})
)(EmployerContainer);