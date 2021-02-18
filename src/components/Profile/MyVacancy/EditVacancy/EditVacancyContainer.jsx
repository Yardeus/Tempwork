import React from "react";
import {connect} from "react-redux";

import EditVacancy from "./EditVacancy";
import {compose} from "redux";
import {
    deleteMyVacancy,
    editModeChange,
    getMyVacancy,
    getOneVacancy,
    updateDataMyVacancy
} from "../../../../redux/profile-reducer";
import {getJobs, updateStatus} from "../../../../redux/employer-reducer";
import {withRouter} from "react-router-dom";
import Preloader from "../../../common/preloader";
import Login from "../../../Login/Login";



class EditVacancyContainer extends React.Component {

    componentDidMount() {
        let vacancyId = this.props.match.params.vacancyId;
        this.props.getOneVacancy(vacancyId)
        this.props.getJobs("professions");
    }


    getSpecialisations = (profession) => {
        debugger
        this.props.getJobs("specialisation",profession);
    }


    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : (this.props.editVacancy ? <EditVacancy {...this.props}
                                                                                           getSpecialisations={this.getSpecialisations}
                                                                                           updateDataMyVacancy={this.props.updateDataMyVacancy}/> : <Preloader/>)}


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
        professions: state.employerPage.professions,
        specialisations: state.employerPage.specialisations,

    }
}
export default compose(
    connect(mapStateToProps, {getOneVacancy,getJobs,updateDataMyVacancy}),
    withRouter
)(EditVacancyContainer);


