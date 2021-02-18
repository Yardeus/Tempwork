import React from "react";
import {connect} from "react-redux";
import Preloader from "../common/preloader";
import {compose} from "redux";
import Employer from "./Employer";
import {changeOneProfession, createNewVacancy, getJobs} from "../../redux/employer-reducer";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

class EmployerContainer extends React.Component {


    componentDidMount() {
        debugger
        this.props.getJobs("professions");
    }

    getSpecialisations = (profession) => {
        debugger
        this.props.getJobs("specialisation",profession);
    }

    render() {
        return (
            <>
                {!this.props.professions ? <Preloader/> : <Employer {...this.props} getSpecialisations={this.getSpecialisations}/>}

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
    userId: state.auth.userId
})

export default compose(
    WithAuthRedirect,
    connect(mapStateToProps, {getJobs,changeOneProfession,createNewVacancy})
)(EmployerContainer);