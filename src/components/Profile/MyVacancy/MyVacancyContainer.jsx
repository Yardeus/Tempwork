import React from "react";
import {connect} from "react-redux";

import MyVacancy from "./MyVacancy";
import {
    closeMyVacancy,
    deleteMyVacancy,
    editModeChange,
    getData,
    getMyVacancy,
    SetCurrentRespondVacancyId
} from "../../../redux/profile-reducer";
import {updateStatus} from "../../../redux/employer-reducer";
import EditVacancyContainer from "./EditVacancy/EditVacancyContainer";
import {compose} from "redux";
import {WithAuthRedirect} from "../../../hoc/WithAuthRedirect";


class MyVacancyContainer extends React.Component {

    componentDidMount() {
        this.props.getMyVacancy(this.props.userId, this.props.type,this.props.token)
    }


    editModeChange(status,idVacancy) {
        this.editModeChange(status,idVacancy)
    }


    render() {
        return <>
            <MyVacancy {...this.props}  editModeChange={this.editModeChange}
                       closeMyVacancy={this.props.closeMyVacancy} SetCurrentRespondVacancyId={this.props.SetCurrentRespondVacancyId}
                       deleteVacancy={this.props.deleteMyVacancy}/>

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
        token: state.auth.token

    }
}

export default compose(WithAuthRedirect,
    connect(mapStateToProps, {getMyVacancy, editModeChange, closeMyVacancy, SetCurrentRespondVacancyId, deleteMyVacancy})
)(MyVacancyContainer);



