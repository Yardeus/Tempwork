import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Find from "./Find";
import {changeOneProfession, createNewVacancy, getJobs} from "../../../redux/employer-reducer";
import Preloader from "../../common/preloader";
import {filterModeIsFetching, getFilterVacancy, getVacancy, updateFilter} from "../../../redux/employee-reducer";

class EmployerContainer extends React.Component {

    componentDidMount() {
        this.props.getJobs("professions");
    }



    getSpecialisations = (profession) => {
        this.props.getJobs("specialisation",profession);
    }

    render() {
        return (
            <>
                {!this.props.professions ? <Preloader/> : <Find {...this.props} getSpecialisations={this.getSpecialisations}
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
})

export default compose(
    connect(mapStateToProps, {getJobs,changeOneProfession,createNewVacancy, getFilterVacancy,filterModeIsFetching, updateFilter, getVacancy})
)(EmployerContainer);