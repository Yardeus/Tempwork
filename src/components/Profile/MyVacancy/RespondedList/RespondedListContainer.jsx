import React from "react";
import {connect} from "react-redux";

import {compose} from "redux";
import {
    createAgreement,
    FormRespondedMyVacancy,
    getRespondedFromMyVacancy,
    SetCurrentRespondVacancyId
} from "../../../../redux/profile-reducer";
import RespondedList from "./RespondedList";


class RespondedListContainer extends React.Component {

    componentDidMount() {
        this.props.getRespondedFromMyVacancy(this.props.currentResponded)
    }




    render() {
        return <>
            <RespondedList {...this.props} SetCurrentRespondVacancyId={this.props.SetCurrentRespondVacancyId}
                           FormRespondedMyVacancy={this.props.FormRespondedMyVacancy}
                           createAgreement={this.props.createAgreement}/>

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
        currentResponded: state.profilePage.currentResponded

    }
}

export default compose(
    connect(mapStateToProps, {getRespondedFromMyVacancy,SetCurrentRespondVacancyId,FormRespondedMyVacancy, createAgreement})
)(RespondedListContainer);



