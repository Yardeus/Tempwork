import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Find from "./Find";
import {changeOneProfession, createNewVacancy, getJobs} from "../../../redux/employer-reducer";
import Preloader from "../../common/preloader";
import {
    filterModeIsFetching, getCities, getExperiences,
    getFilterVacancy, getShedules, getTypesVacancy,
    getVacancy,
    updateFilter
} from "../../../redux/employee-reducer";

class EmployerContainer extends React.Component {

    componentDidMount() {
        this.props.getJobs("professions");
        this.props.getCities();
        this.props.getShedules();
        this.props.getExperiences();
        this.props.getTypesVacancy();
    }


    getSpecialisations = (profession) => {
        this.props.getJobs("specialisation", profession);
    }

    render() {
        return (
            <>
                {!this.props.professions ? <Preloader/> :
                    <Find {...this.props} getSpecialisations={this.getSpecialisations}
                          getFilterVacancy={this.props.getFilterVacancy}
                          filterModeIsFetching={this.props.filterModeIsFetching}
                          updateFilter={this.props.updateFilter}
                          getVacancy={this.props.getVacancy}

                        /* handleClick={this.handleClick}*//>}

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
    count: state.employeePage.count,
    pageSize: state.employeePage.pageSize,
    currentPage: state.employeePage.currentPage,
    filterMode: state.employeePage.filterMode,
    filter: state.employeePage.filter,
    cities: state.employeePage.cities,
    shedules: state.employeePage.shedules,
    experiences: state.employeePage.experiences,
    typesVacancy: state.employeePage.typesVacancy,
    token: state.auth.token,
})

export default compose(
    connect(mapStateToProps, {
        getJobs,
        changeOneProfession,
        createNewVacancy,
        getFilterVacancy,
        filterModeIsFetching,
        updateFilter,
        getVacancy,
        getCities,
        getShedules,
        getExperiences,
        getTypesVacancy
    })
)(EmployerContainer);